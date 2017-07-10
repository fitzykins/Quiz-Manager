import React, {Component} from 'react';
import {connect} from 'react-redux';



class Login extends Component {

  render () {
    if(this.props.users) {
      const options = this.props.users.map((user, index) => (
        <option key={index} value={user}>{user}</option>
      ));
      return (
        <form>
          <select name="users">
            {options}
          </select>
        </form>
      );
    }
  }
}

const mapStateToProps= state =>({
  users: state.users;
});

export default connect(mapStateToProps);
