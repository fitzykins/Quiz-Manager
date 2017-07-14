import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions';
import {Link} from 'react-router-dom';

import '../CSS/admin-page.css';
// fetchUser,


class AdminPage extends Component {
  checkLogin() {
    if(!this.props.adminId) {
      this.props.history.push(`/`);
    }
  }

  componentDidMount() {
    this.checkLogin();
    this.props.dispatch(fetchUsers());
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  render () {
   const users = this.props.users.map((user, index) => {
     return (
       <li key={index} className="admin-user-list">
         <Link className="admin-user-link" to={`/admin/${this.props.adminId}/${index}`}>
           {user.userName}
         </Link>
       </li>
     )
   });
   return (
    <div className='admin-view'>
      <h3 className="admin-name">{this.props.adminName}</h3>
      <p className="user-nav">User List</p>
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
    return !user.isAdmin;
  })
});

export default connect(mapStateToProps)(AdminPage);
