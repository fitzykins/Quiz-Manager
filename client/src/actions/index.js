const base64 = require('base-64');

export const RESET_TEST = 'RESET_TEST'
export const resetTest = () => ({
  type: RESET_TEST
});

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const incrementScore = (score, count) => ({
  type: INCREMENT_SCORE,
  score,
  count
});

export const SET_ANSWER = 'SET_ANSWER';
export const setAnswer = (answer, one, two, three, four) => ({
  type: SET_ANSWER,
  answer,
  one,
  two,
  three,
  four
});

export const TOGGLE_QUIZ_PAGE = 'TOGGLE_QUIZ_PAGE';
export const toggleQuizPage = () => ({
  type: TOGGLE_QUIZ_PAGE
});

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = password => ({
  type: SET_PASSWORD,
  password
});

export const SET_USERNAME = 'SET_USERNAME';
export const setUsername = userName => ({
  type: SET_USERNAME,
  userName
});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  type: SIGN_OUT
});
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => ({
  type: FETCH_REQUEST
});

export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const fetchLogInSuccess = user => ({
  type: FETCH_LOGIN_SUCCESS,
  user
})

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user
});

export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const fetchQuizSuccess = quiz => ({
  type: FETCH_QUIZ_SUCCESS,
  quiz
});

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});

export const FETCH_UPDATE_QUIZ_SUCCESS = 'FETCH_UPDATE_QUIZ_SUCCESS';
export const fetchUpdateQuizSuccess = (quizName, score, status) => ({
  type: FETCH_UPDATE_QUIZ_SUCCESS,
  quizName,
  score,
  status
});

export const fetchLogIn = (username, password) => dispatch => {
  const url = 'https://guiz-manager.herokuapp.com/api/login';
  dispatch(fetchRequest());
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + base64.encode(username + ':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(_user => {
    const user = _user.user;
    return dispatch(fetchLogInSuccess(user));
  }).catch(error =>
    dispatch(fetchError(error))
  );
}

export const fetchUsers = () => (dispatch, getState) => {
  const state = getState();
  const username = state.loginName;
  const password = state.loginPass;
  const url = 'https://guiz-manager.herokuapp.com/api/users';

  dispatch(fetchRequest());

  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + base64.encode(username + ':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(users => {
    return dispatch(fetchUsersSuccess(users));
  }).catch(error =>
    dispatch(fetchError(error))
  );
};

export const fetchUser = userId => (dispatch, getState) => {
  const state = getState();
  const username = state.loginName;
  const password = state.loginPass;
  const url = `https://guiz-manager.herokuapp.com/api/users/${userId}`;

  dispatch(fetchRequest());

  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + base64.encode(username + ':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(user => {
    return dispatch(fetchUserSuccess(user));
  }).catch(error =>
    dispatch(fetchError(error))
  );
};

export const fetchQuiz = quizId => (dispatch, getState) => {
  const state = getState();
  const username = state.loginName;
  const password = state.loginPass;
  const url = `https://guiz-manager.herokuapp.com/api/quizzes/${quizId}`;

  dispatch(fetchRequest());

  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + base64.encode(username + ':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(quiz => {
    return dispatch(fetchQuizSuccess(quiz));
  }).catch(error =>
    dispatch(fetchError(error))
  );
};

export const updateQuiz = (quizName, userId, score, status) => (dispatch, getState) => {
  const state = getState();
  const username = state.loginName;
  const password = state.loginPass;
  const url = `https://guiz-manager.herokuapp.com/api/updateuserquiz/${quizName}/${userId}`;

  dispatch(fetchRequest());

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, /',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64.encode(username + ':' + password)
    },
    body: JSON.stringify({score, status})
  }).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(_results => {
    return dispatch(fetchUpdateQuizSuccess(quizName, score, status));
  }).then(results => {
    return dispatch(fetchUpdateQuizSuccess(results));
  }).catch(error =>
      dispatch(fetchError(error))
    );
};
