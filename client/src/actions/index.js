const base64 = require('base-64');

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

export const fetchLogIn = (username, password) => dispatch => {
  const url ='http://localhost:8080/api/login';
  console.log('The username and password', username, password);
  dispatch(fetchRequest());
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + base64.encode(username +':' + password),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(_user => {
    const user = _user.user;
    console.log('this is the user', user);
    return dispatch(fetchLogInSuccess(user));
  }).catch(error =>
      dispatch(fetchError(error))
    );
}

export const fetchUsers = () => (dispatch, getState) => {
  // const state = getState();
  // const username = state.username;
  const url = 'http://localhost:8080/api/users';

  dispatch(fetchRequest());

  return fetch(url).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(users => {
    return dispatch(fetchUsersSuccess(users));
  }).catch(error =>
       dispatch(fetchError(error))
     );
};

export const fetchUser = userId => dispatch => {
  const url = `http://localhost:8080/api/users/${userId}`;

  dispatch(fetchRequest());

  return fetch(url).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(user => {
    return dispatch(fetchUserSuccess(user));
  }).catch(error =>
       dispatch(fetchError(error))
     );
};

export const fetchQuiz = quizId => dispatch => {
  const url = `http://localhost:8080/api/quizzes/${quizId}`;

  dispatch(fetchRequest());

  return fetch(url).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(quiz => {
    return dispatch(fetchQuizSuccess(quiz));
  }).catch(error =>
       dispatch(fetchError(error))
     );
};
