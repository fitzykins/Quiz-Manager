// export const INITIAL = "INITIAL";
// export const initial = () => ({
//   type:INITIAL
// });
//
// export const GET_USER = "GET_USER";
// export const getUser = userId => ({
//   type: GET_USER,
//   userId
// });

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


export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  type: SIGN_OUT
});
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => ({
  type: FETCH_REQUEST
});

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
export const fetchUpdateQuizSuccess = results => ({
  type: FETCH_UPDATE_QUIZ_SUCCESS,
  results
});


export const fetchUsers = () => dispatch => {
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

export const updateQuiz = (quizName, userId, score, status) => dispatch => {
  const url = `http://localhost:8080/api/updateuserquiz/${quizName}/${userId}`;

  dispatch(fetchRequest());

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, /',
      'Content-Type': 'application/json' },
    body: JSON.stringify({score, status})
  }).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(results => {
    return dispatch(fetchUpdateQuizSuccess(results));
  }).catch(error =>
      dispatch(fetchError(error))
    );
};
