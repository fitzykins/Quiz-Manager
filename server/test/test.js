'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {User, Quiz} = require('../models');
const {app, runServer, closeServer} = require('../index');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');

const should = chai.should();
chai.use(chaiHttp);

function generateUser(){
  return {
    userName: faker.name.firstName(),
    isAdmin: faker.lorem.word(),
    password: faker.lorem.word(),
    quizzes:[{
      id: faker.random.number(),
      status:faker.lorem.word(),
      quiz: faker.name.jobTitle(),
      score: faker.random.number()
    }]
  };
}

function seedUser(){
  console.info('seeding test User data....');

  const seedData = [];
  for(let i =0; i < 10; i++){
    seedData.push(generateUser());
  }
  return User.insertMany(seedData);
}

function generateQuiz(){
  return {
    name: faker.name.jobTitle(),
    passingScore: faker.random.number(),
    questions:[{
      question: faker.lorem.word(),
      score: faker.random.number(),
      correctAnswer: faker.lorem.word(),
      totalAnswers:[faker.lorem.word]
    }]
  };
}

function seedQuiz(){
  console.info('seeding test Quiz data....');

  const seedData = [];
  for(let i =0; i < 10; i++){
    seedData.push(generateQuiz());
  }
  return Quiz.insertMany(seedData);
}

function dropTestData(){
  return mongoose.connection.dropDatabase();
}

describe('Endpoints', function(){
  before(function(){
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function(){
    return(seedUser(), seedQuiz());
  });

  afterEach(function(){
    return dropTestData();
  });

  after(function(){
    return closeServer();
  });

  describe('User Test', function(){
    describe('GET', function(){
      it('Should return all users information', function(){

        return chai.request(app)
          .get('/api/users')
          .then(function(res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.at.least(1);

            const expectedKeys = ['id', 'userName', 'quizzes', 'isAdmin'];
            res.body.forEach(function(item){
              item.should.be.a('object');
              it.should.include.keys(expectedKeys);
            });
          });
      });
    });

    describe('GET by ID', function(){
      it('Should return a single user searched by ID', function(){
        let testUser = {};

        return chai.request(app)
        .get('/api/users')
        .then(function(res){
          testUser = res.body[0];
          return chai.request(app)
            .get(`/api/users/${testUser.id}`);
        })
        .then(function(res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.userName.should.equal(testUser.userName);
          res.body.quizzes[0].id.should.equal(testUser.quizzes[0].id);
          res.body.quizzes[0].status.should.equal(testUser.quizzes[0].status);
          res.body.quizzes[0].quiz.should.equal(testUser.quizzes[0].quiz);
          res.body.quizzes[0].score.should.equal(testUser.quizzes[0].score);
          res.body.id.should.equal(testUser.id);
          res.body.isAdmin.should.equal(testUser.isAdmin);
        });
      });
    });

    describe('POST', function(){
      it('Should add an user on Post', function(){
        const newUser = generateUser();

        return chai.request(app)
          .post('/api/users')
          .send(newUser)
          .then(function(res){
            res.body.should.be.a('object');
            res.body.should.include.keys('id', 'userName', 'isAdmin', 'quizzes');
            res.body.id.should.not.be.null;

            return User.findById(res.body.id);
          })
          .then(function(res){
            res.id.should.equal(newUser.id);
            res.userName.should.equal(newUser.userName);
            res.isAdmin.should.equal(newUser.isAdmin);
            res.quizzes[0].id.should.equal(newUser.quizzes[0].id);
            res.quizzes[0].status.should.equal(newUser.quizzes[0].status);
            res.quizzes[0].quiz.should.equal(newUser.quizzes[0].quiz);
            res.quizzes[0].score.should.equal(newUser.quizzes[0].score);
          });
      });
    });
  
    describe('PUT', function(){
      it('Should update a user on PUT', function(){
        const updateUser = generateUser();

        return chai.request(app)
          .get('/api/users')
          .then(function(res){
            updateUser.id = res.body[0].id;
            return chai.request(app)
              .put(`/api/users/${updateUser.id}`)
              .send(updateUser);
          })
          .then(function(res){
            res.should.have.status(201);
            res.should.be.json;
            res.should.be.a('object');
            res.userName.should.equal(updateUser.userName);
            res.isAdmin.should.equal(updateUser.isAdmin);
            res.quizzes[0].id.should.equal(updateUser.quizzes[0].id);
            res.quizzes[0].status.should.equal(updateUser.quizzes[0].status);
            res.quizzes[0].quiz.should.equal(updateUser.quizzes[0].quiz);
            res.quizzes[0].score.should.equal(updateUser.quizzes[0].score);
          });
      });
    });

    describe('DELETE', function(){
      it('Should delete user by id from user collection', function(){
        return chai.request(app)
          .get('/api/users')
          .then(function(res){
            return chai.request(app)
              .delete(`/api/users/${res.body[0].id}`);
          })
          .then(function(res){
            res.should.have.status(204);
          });
      });
    });

  });

  describe('Quiz Test', function(){
    describe('GET', function(){
      it('Should return all quizzes information', function(){

        return chai.request(app)
          .get('/api/quizzes')
          .then(function(res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.at.least(1);

            const expectedKeys = ['id', 'name', 'passingScore', 'questions'];
            res.body.forEach(function(item){
              item.should.be.a('object');
              it.should.include.keys(expectedKeys);
            });
          });
      });
    });

    describe('GET by ID', function(){
      it('Should return a single quiz searched by ID', function(){
        let testQuiz = {};

        return chai.request(app)
        .get('/api/quizzes')
        .then(function(res){
          testQuiz = res.body[0];
          return chai.request(app)
            .get(`/api/quizzes/${testQuiz.id}`);
        })
        .then(function(res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.id.should.equal(testQuiz.id);
          res.body.questions[0].question.should.equal(testQuiz.questions[0].question);
          res.body.questions[0].score.should.equal(testQuiz.questions[0].score);
          res.body.questions[0].correctAnswer.should.equal(testQuiz.questions[0].correctAnswer);
          res.body.questions[0].totalAnswers[0].should.equal(testQuiz.questions[0].totalAnswers[0]);
          res.body.name.should.equal(testQuiz.name);
          res.body.passingScore.should.equal(testQuiz.passingScore);
        });
      });
    });

    describe('POST', function(){
      it('Should add an quiz on Post', function(){
        const newQuiz = generateQuiz();

        return chai.request(app)
          .post('/api/quizzes')
          .send(newQuiz)
          .then(function(res){
            res.body.should.be.a('object');
            res.body.should.include.keys('id', 'name', 'passingScore', 'questions');
            res.body.id.should.not.be.null;

            return Quiz.findById(res.body.id);
          })
          .then(function(res){
            res.id.should.equal(newQuiz.id);
            res.questions[0].question.should.equal(newQuiz.questions[0].question);
            res.questions[0].score.should.equal(newQuiz.questions[0].score);
            res.questions[0].correctAnswer.should.equal(newQuiz.questions[0].correctAnswer);
            res.questions[0].totalAnswers[0].should.equal(newQuiz.questions[0].totalAnswers[0]);
            res.name.should.equal(newQuiz.name);
            res.passingScore.should.equal(newQuiz.passingScore);
          });
      });
    });
  
    describe('PUT', function(){
      it('Should update a user on PUT', function(){
        const updateQuiz = generateQuiz();

        return chai.request(app)
          .get('/api/quizzes')
          .then(function(res){
            updateQuiz.id = res.body[0].id;
            return chai.request(app)
              .put(`/api/quizzes/${updateQuiz.id}`)
              .send(updateQuiz);
          })
          .then(function(res){
            res.should.have.status(201);
            res.should.be.json;
            res.should.be.a('object');
            res.id.should.equal(updateQuiz.id);
            res.questions[0].question.should.equal(updateQuiz.questions[0].question);
            res.questions[0].score.should.equal(updateQuiz.questions[0].score);
            res.questions[0].correctAnswer.should.equal(updateQuiz.questions[0].correctAnswer);
            res.questions[0].totalAnswers[0].should.equal(updateQuiz.questions[0].totalAnswers[0]);
            res.name.should.equal(updateQuiz.name);
            res.passingScore.should.equal(updateQuiz.passingScore);
          });
      });
    });

    describe('DELETE', function(){
      it('Should delete user by id from user collection', function(){
        return chai.request(app)
          .get('/api/quizzes')
          .then(function(res){
            return chai.request(app)
              .delete(`/api/quizzes/${res.body[0].id}`);
          })
          .then(function(res){
            res.should.have.status(204);
          });
      });
    });

  });
});