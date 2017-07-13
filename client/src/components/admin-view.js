import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class AdminView extends Component {

  render() {
    if(this.props.users.length < 1 ) {
      return <p>This is Broken</p>;
    }
    const userIndex = this.props.match.params.userIndex;
    const quizzes = this.props.users[userIndex].quizzes.map((quiz,index) => (
      <li key={index}>
         {quiz.quiz}
        <p>Status: {quiz.status}</p>
      </li>
    ));
    return (
      <div>
       <h3>{this.props.users[userIndex].userName}</h3>
       <Link to={`/admin/${this.props.match.params.adminId}`}>
       <p>Go Back</p>
       </Link>
        <ul>
         {quizzes}
        </ul>
      </div>
    )
  }
}

const mapStateToProps= state =>({
  users: state.users.filter(user => {
    return !user.isAdmin;
  })
});

export default connect(mapStateToProps)(AdminView);
