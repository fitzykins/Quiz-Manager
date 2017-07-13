import {FETCH_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FETCH_ERROR,
  INCREMENT_SCORE,
  SET_ANSWER,
  TOGGLE_QUIZ_PAGE,
  FETCH_UPDATE_QUIZ_SUCCESS,
  SIGN_OUT} from '../actions';

const initialState = {
  users: [],
  loading: false,
  error: null,
  userName: null,
  userId: null,
  quizzes: null,
  quizId: null,
  questions: [],
  passingScore: null,
  quizName: null,
  quizScore: 0,
  status: null,
  score: 0,
  count: 0,
  selectedAnswer: null,
  showQuiz: true,
  showResults: false
};

export default (state=initialState, action) => {
  if(action.type === FETCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }else if (action.type === FETCH_USERS_SUCCESS) {
    return Object.assign({}, state, {
      users: action.users,
      loading: false,
      error: null
    });
  }else if (action.type === FETCH_USER_SUCCESS) {
    const userName = action.user.userName;
    const userId = action.user.id;
    const quizzes = action.user.quizzes;
    return Object.assign({}, state, {
      userName,
      userId,
      quizzes
    });
  }else if (action.type=== FETCH_QUIZ_SUCCESS) {
    const quizName = action.quiz.name;
    const quizId = action.quiz.id;
    const passingScore = action.quiz.passingScore;
    const questions = action.quiz.questions;
    return Object.assign({}, state, {
      quizName,
      quizId,
      passingScore,
      questions
    })
  }else if(action.type === FETCH_UPDATE_QUIZ_SUCCESS) {
    console.log("update reducer has been hit", action);
    const quizScore = action.results.score;
    const status = action.results.status;
    return Object.assign({}, state, {
      status,
      quizScore
    })
  }else if (action.type === FETCH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }else if(action.type === INCREMENT_SCORE) {
    return Object.assign({}, state, {
      score: action.score,
      count: action.count,
      selectedAnswer: null
    });
  }else if(action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      selectedAnswer: action.answer
    });
  }else if(action.type === TOGGLE_QUIZ_PAGE) {
    return Object.assign({}, state, {
      showQuiz: !state.showQuiz,
      showResults: !state.showResults
    })
  }else if (action.type === SIGN_OUT) {
    return Object.assign({}, state, {
      users: [],
      loading: false,
      error: null,
      userName: null,
      userId: null,
      quizzes: null,
      quizId: null,
      questions: [],
      passingScore: null,
      quizName: null,
      count: 0,
      score: 0,
      selectedAnswer: null,
      showQuiz: true,
      showResults: false
    });
  }
  return state;


}
