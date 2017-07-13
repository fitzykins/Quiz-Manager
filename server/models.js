'use strict';
// heyo
const mongoose = require('mongoose');

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
    id: this._id,
    name: this.name,
    passingScore: this.passingScore,
    questions: this.questions
  };
};

const userSchema = mongoose.Schema({
  userName: String,
  quizzes: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
    status: { type: String, enum:['Passed', 'Failed', 'Not Taken'] },
    quiz: String,
    score: Number
  }]
});

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    userName: this.userName,
    quizzes: this.quizzes
  };
};



const User = mongoose.model('User', userSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = {User, Quiz};
