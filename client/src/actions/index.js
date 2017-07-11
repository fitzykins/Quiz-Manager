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

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
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
