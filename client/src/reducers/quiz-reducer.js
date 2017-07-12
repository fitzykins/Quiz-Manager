// import {INITIAL, GET_USER} from '../actions';
import {FETCH_REQUEST,FETCH_USERS_SUCCESS,FETCH_USER_SUCCESS,FETCH_QUIZ_SUCCESS,FETCH_ERROR,SET_USER} from '../actions';
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
  score: 0,
  userBeingViewed: null
};

export default (state=initialState, action) => {
  // if(action.type === INITIAL) {
  //   return Object.assign({}, state, {
  //     users: [{id: 1, userName: 'admin'}, {id: 2, userName: 'pass'}, {id: 3, userName: 'fail'}]
  //   });
  // }else if(action.type === GET_USER) {
  //   const userId = action.username;
  //   return Object.assign({}, state, {
  //     userId
  //   })
  // }
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
  }else if (action.type === FETCH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;


}
