import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions';
import {Link} from 'react-router-dom';
// fetchUser,


class AdminPage extends Component {
  componentDidMount() {
    if(this.props.users.length < 1){
      this.props.dispatch(fetchUsers());
    }

  }

  render () {
   const users = this.props.users.map((user, index) => {
     return (
       <li key={index}>
         <Link to={`/admin/${this.props.adminId}/${index}`}>
           {user.userName}
         </Link>
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
    return !user.isAdmin;
  })
});

export default connect(mapStateToProps)(AdminPage);
