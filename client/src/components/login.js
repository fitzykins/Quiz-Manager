import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers,signOut,setPassword,setUsername,fetchLogIn} from '../actions';
import AdminPage from './admin-page';
import UserPage from './user-page';

class Login extends Component {
  goToUser(e) {
    e.preventDefault();
    const user = this.props.users.find(user => {
      return user.userName === this.input.value;
    });
    if(user.userName === 'Admin') {
      this.props.history.push(`/admin/${user.id}`);
    }else {
      this.props.history.push(`/user/${user.id}`);
    }
  }

  updateUser(userName) {
    this.props.dispatch(setUsername(userName));
  }

  updatePassword(password) {
    this.props.dispatch(setPassword(password));
  }

  componentDidMount() {
    this.props.dispatch(signOut());
    this.props.dispatch(fetchUsers());
  }

  logIn(e) {
   e.preventDefault();
   this.props.dispatch(fetchLogIn(this.props.loginName, this.props.password));
  }

  render () {
    if(this.props.admin) {
      return <AdminPage />
    }else if(this.props.loggedIn) {
      return <UserPage />
    }else {
      if(this.props.users) {
        // const options = this.props.users.map((user, index) => (
        //   <option key={index} value={user.userName}>{user.userName}</option>
        // ));
        return (
          <form onSubmit={e => this.logIn(e)} >
            <input type='username' placeholder='username' value={this.props.loginName} onChange={e=> this.updateUser(e.target.value)} />
            <input type='password' placeholder='password' value={this.props.password} onChange={e=> this.updatePassword(e.target.value)}/>
            <button type="submit">login</button>
          </form>
        )
      }
    }
  }
}

const mapStateToProps = state =>({
  users: state.users,
  admin: state.admin,
  loggedIn: state.loggedIn,
  password: state.loginPass,
  loginName: state.loginName

});

export default connect(mapStateToProps)(Login);
