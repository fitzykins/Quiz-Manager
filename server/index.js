'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {User, Quiz} = require('./models');
const {DATABASE_URL, PORT} = require('./config');

const app = express();


app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('./'));
mongoose.Promise = global.Promise;


// API endpoints go here!
app.get('/api/users', (req, res) =>{
  User
    .find()
    .then(users =>{
      res.json(users.map((user)=>{
        return user.apiRepr();
      }));
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the users.'});
    });
});

app.get('/api/users/:id', (req, res) =>{
  User
    .findById(req.params.id)
    .then(user => res.json(user.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the user.'});
    });
});

app.get('/api/quizzes', (req, res) =>{
  Quiz
    .find()
    .then(quizzes =>{
      res.json(quizzes.map((quiz =>{
        return quiz.apiRepr();
      })));
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the quizzes.'});
    });
});

app.get('/api/quizzes/:id', (req, res) =>{
  Quiz
    .findById(req.params.id)
    .then(quiz => res.json(quiz.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the quiz.'});
    });
});

app.post('/api/users', (req, res) =>{
  User
    .create({
      userName: req.body.userName,
      quizzes: req.body.quizzes
    })
    .then(user => res.status(201).json(user.apiRepr))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to add the user.'});
    });
});

app.post('/api/quizzes', (req, res) =>{
  const requiredFields = ['name', 'passingScore', 'questions'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Quiz
    .create({
      name: req.body.name,
      passingScore: req.body.passingScore,
      questions: req.body.questions
    })
    .then(quiz => res.status(201).json(quiz.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to add the quiz.'});
    });
});

app.put('/api/users/:id', (req, res) =>{
  if (!(req.params.id && req.body.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['userName', 'quizzes'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updateUser => res.status(201).json(updateUser.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to update the user.'});
    });
});


app.put('/api/quizzes/:id', (req, res) =>{
  if (!(req.params.id && req.body.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['name', 'passingScore', 'questions'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Quiz
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updateQuiz => res.status(201).json(updateQuiz.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to update the quiz.'});
    });
});

app.delete('/api/users/:id', (req, res) =>{
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted user with id \`${req.params.id}\``);
      res.status(204).end();
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to remove the user.'});
    });
});

app.delete('/api/quizzes/:id', (req, res) =>{
  Quiz
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted quiz with id \`${req.params.id}\``);
      res.status(204).end();
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to remove the quiz.'});
    });
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
// function runServer(databaseUrl=DATABASE_URL, port=PORT) {
//   console.log('This is the database URL', DATABASE_URL);
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       resolve();
//     }).on('error', reject);
//   });
// }
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });

}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
