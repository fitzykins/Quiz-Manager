'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {type: String},
  quizzes: {type: Array, default:[{
    name: {type: String},
    status: {type: String},
    score: {type: Number}
  }]}
});

userSchema.methods.apiRepr = function() {
  return {
    userName: this.userName,
    quizzes: this.quizzes
  };
};

const quizSchema = mongoose.Schema({
  name: {type: String},
  passingScore: {type: Number},
  questions: {type: Array, default: [{
    question: {type: String},
    correctAnswer: {type: String},
    allAnswers: {type: Array, default:[]}
  }]}
});

quizSchema.methods.apiRepr = function () {
  return {
    name: this.name,
    passingScore: this.passingScore,
    questions: this.questions
  };
};

const User = mongoose.model('User', userSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = {User, Quiz};