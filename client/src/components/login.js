import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions';



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

  componentDidMount() {
    // this.props.dispatch(resetState());
    this.props.dispatch(fetchUsers());
  }

  render () {
    if(this.props.userId){
      console.log('problem', this.props.userId);
    }
    if(this.props.users) {
      const options = this.props.users.map((user, index) => (
        <option key={index} value={user.userName}>{user.userName}</option>
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
  userId: state.userId,
  users: state.users
});

export default connect(mapStateToProps)(Login);
