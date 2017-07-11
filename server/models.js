'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  quizzes: [{
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: [true,'No quiz id found']},
    status: { type: String, enum:['Pass', 'Fail', 'Not Taken'] },
    score: Number,
    date: Date
  }]
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
  questions: [{
    question: String,
    score: Number,
    correctAnswer: String,
    totalAnswers: [String]
  }]
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