'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  quizzes: Array
});

userSchema.methods.apiRepr = function() {
  return {
    userName: this.userName,
    quizzes: this.quizzes
  };
};

const quizSchema = mongoose.Schema({
  name: String,
  passingScore: Number,
  questions: Array
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