import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initial} from '../actions';



class Login extends Component {
  goToUser(e) {
    e.preventDefault();
    const user = this.input.value;
    if(user === 'admin') {
      this.props.history.push(`/admin/${user}`);
    }else {
      this.props.history.push(`/user/${user}`);
    }

  }

  componentDidMount() {
    this.props.dispatch(initial());
  }

  render () {
    if(this.props.users) {
      const options = this.props.users.map((user, index) => (
        <option key={index} value={user}>{user}</option>
      ));
      return (
        <form onSubmit={e => this.goToUser(e)} >
          <select name="users" ref={input=>this.input=input}>
            {options}
          </select>
          <button type="submit">submit</button>
        </form>
      )
    }
  }
}

const mapStateToProps= state =>({
  users: state.users
});

export default connect(mapStateToProps)(Login);
