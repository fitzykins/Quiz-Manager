import {INITIAL, GET_USER} from '../actions';

const initialState = {
  users: []
};

export default (state=initialState, action) => {
  if(action.type === INITIAL) {
    return Object.assign({}, state, {
      users: ['admin', 'pass', 'fail']
    });
  }else if(action.type === GET_USER) {
    const username = action.username;
    return Object.assign({}, state, {
      username
    })
  }
  return state;


}
