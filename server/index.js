'use strict';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const {User, Quiz} = require('./models');

const app = express();

// API endpoints go here!
app.get('/users', (req, res) =>{
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

app.get('/users/:id', (req, res) =>{
  User
    .findById(req.params.id)
    .then(user => res.json(user.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the user.'});
    });
});

app.get('/quizzes', (req, res) =>{
  Quiz
    .find()
    .then(quizzes =>{
      res.json(quizzes.map((quiz =>{
        return quiz.apiRepr();
      })));
    })
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the quizzes'});
    });
});

app.get('/quizzes/:id', (req, res) =>{
  Quiz
    .findById(req.params.id)
    .then(quiz => res.json(quiz.apiRepr()))
    .catch(err =>{
      console.error(err);
      res.status(500).json({error: 'We are sorry, we were unable to retrieve the quiz'});
    });
});

app.post('/users', (req, res) =>{
  
})


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
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
