import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser, fetchUsers} from '../actions';
import {Link} from 'react-router-dom';



class AdminPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.match.params.adminId));
    this.props.dispatch(fetchUsers());
  }

  render () {
   console.log(this.props);
   const users = this.props.users.map((user, index) => {
     return (
       <li key={index}>
         {user.userName}
       </li>
     )
   })
   return (
    <div className='admin-view'>
      <h3>{this.props.adminName}</h3>
      <ul className="admin-users">
        {users}
      </ul>
    </div>
   )
  }
}

const mapStateToProps= state =>({
  adminId: state.userId,
  adminName: state.userName,
  users: state.users.filter(user => {
    return !user.userName.toLowerCase().includes('admin');
  })
});

export default connect(mapStateToProps)(AdminPage);
