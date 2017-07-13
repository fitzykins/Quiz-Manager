'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ObjectId = require('mongoose').Types.ObjectId;
const passport = require('passport');
const {BasicStrategy} = require('passport-http');

const {User, Quiz} = require('./models');
const {DATABASE_URL, PORT} = require('./config');

const app = express();

//Basic authentication strategy
const strategy = new BasicStrategy(function(username, password, callback) {
  let user;
  console.log('are we here', username, password);
  User
    .findOne({userName: username})
    .exec()
    .then(_user => {
      console.log('user', _user);
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      console.log(user.validatePassword(password));
      return user.validatePassword(password);
    })
    .then(isValid => {
      console.log('valid?', isValid);
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user);
      }
    })
    .catch(err => console.log('Invalid username or password'));
});

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('./'));
mongoose.Promise = global.Promise;
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


function loggedIn(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.json({redirect: '../client/index.js', message: 'Please sign in'});
  }
}

// GET for user to sign in
app.get('/api/login',
	passport.authenticate('basic', {session: true, failureRedirect: '/'}),
		(req, res) => {

  res.json({user: req.user.apiRepr(), message: 'Sign in successful'});
}
);

// GET for user session (protected, must be signed-in already and have session cookie)
app.get('/me', loggedIn, (req, res, next) => {
  res.json({user: req.user.apiRepr()});
}
);

// GET for user to sign out
app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

// API endpoints go here!
app.get('/api/users',loggedIn, (req, res) =>{
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

app.get('/api/users/:id', loggedIn, (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the user.'});
    });
});

app.get('/api/quizzes', loggedIn, (req, res) =>{
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

app.get('/api/quizzes/:id', loggedIn, (req, res) =>{
  Quiz
    .findById(req.params.id)
    .then(quiz => res.json(quiz.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the quiz.'});
    });
});

app.post('/api/users', loggedIn, (req, res) =>{
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

app.post('/api/quizzes', loggedIn, (req, res) =>{
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

app.get('/api/validatescore/:name/:id', loggedIn, (req, res)=>{
  User
    .update({_id:req.params.id, 'quizzes.quiz':req.params.name},
    {$set: {'quizzes.$.status':'Pass'}, $inc: {'quizzes.$.score':1}})
    .then(updateQuiz =>
    res.status(201).json(updateQuiz))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to update the user.'});
    });
});

app.put('/api/users/:id', loggedIn, (req, res) =>{
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


app.put('/api/quizzes/:id', loggedIn, (req, res) =>{
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

app.delete('/api/users/:id', loggedIn, (req, res) =>{
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

app.delete('/api/quizzes/:id', loggedIn, (req, res) =>{
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
function runServer(databaseUrl=DATABASE_URL, port=3001) {
  console.log('This is the database URL', DATABASE_URL);
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
