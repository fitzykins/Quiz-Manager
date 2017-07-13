import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setPassword,setUsername,fetchLogIn} from '../actions';
// signOut,
class Login extends Component {
  goToUser() {
    if(this.props.admin) {
      this.props.history.push(`/admin/${this.props.userId}`);
    }else if (this.props.loggedIn) {
      this.props.history.push(`/user/${this.props.userId}`);
    }
  }

  updateUser(userName) {
    this.props.dispatch(setUsername(userName));
  }

  updatePassword(password) {
    this.props.dispatch(setPassword(password));
  }
 componentDidMount() {
   this.goToUser();
 }
  componentDidUpdate() {
    // this.props.dispatch(signOut());
    this.goToUser();
  }

  logIn(e) {
   e.preventDefault();
   this.props.dispatch(fetchLogIn(this.props.loginName, this.props.password));
  }

  render () {
        return (
          <form onSubmit={e => this.logIn(e)} >
            <input type='username' placeholder='username' value={this.props.loginName} onChange={e=> this.updateUser(e.target.value)} />
            <input type='password' placeholder='password' value={this.props.password} onChange={e=> this.updatePassword(e.target.value)}/>
            <button type="submit">login</button>
          </form>
        )
  }
}

const mapStateToProps = state =>({
  users: state.users,
  userId: state.userId,
  admin: state.admin,
  loggedIn: state.loggedIn,
  password: state.loginPass,
  loginName: state.loginName

});

export default connect(mapStateToProps)(Login);
