'use strict';
// heyo
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  isAdmin: Boolean,
  password: {type: String, required: true},
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
    quizzes: this.quizzes,
    isAdmin: this.isAdmin
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
};

const User = mongoose.model('User', userSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = {User, Quiz};
