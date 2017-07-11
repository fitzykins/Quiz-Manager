export const INITIAL = "INITIAL";
export const initial = () => ({
  type:INITIAL
});

export const GET_USER = "GET_USER";
export const getUser = userId => ({
  type: GET_USER,
  userId
});

// export const FETCH_REQUEST = 'FETCH_REQUEST';
// export const fetchRequest = () => ({
//   type: FETCH_REQUEST
// });
//
// export const FETCH_USERS_SUCCESS = 'FETCH_SUCCESS';
// export const fetchUsersSuccess = users => ({
//   type: FETCH_USER_SUCCESS,
//   users
// });
//
// export const FETCH_ERROR = 'FETCH_ERROR';
// export const fetchError = error => ({
//   type: FETCH_ERROR,
//   error
// });
//
// export const fetchUsers = () => dispatch => {
//   const url = 'http://localhost:8080/api/users';
//
//   dispatch(fetchUsersRequest());
//
//   return fetch(url).then(response => {
//     if(!response.ok) {
//       return Promise.reject(response.statusText);
//     }
//     return response.json();
//   }).then(users => {
//     return dispatch(fetchSuccess(users));
//   }).catch(error =>
//        dispatch(fetchError(error))
//      );
// };
