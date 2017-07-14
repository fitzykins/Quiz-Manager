import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../CSS/admin-view.css';

class AdminView extends Component {
  checkLogin() {
    if(this.props.users.length === 0) {
      this.props.history.push(`/`);
    }
  }

  componentDidMount() {
    this.checkLogin();
  }

  componentDidUpdate() {
    this.checkLogin();
  }


  render() {
    if(this.props.users.length < 1 ) {
      return <p>This is Broken</p>;
    }
    const userIndex = this.props.match.params.userIndex;
    const quizzes = this.props.users[userIndex].quizzes.map((quiz,index) => (
      <li key={index} className="admin-user-quiz">
         <b><u>{quiz.quiz}</u></b>
        <p><i>Status</i>: <b>{quiz.status}</b></p>
      </li>
    ));
    return (
      <div className="admin-user-container">
       <h3 className="admin-user-name">{this.props.users[userIndex].userName}</h3>
        <ul className="admin-user-quiz-list">
         {quizzes}
        </ul>
        <Link className="home-link" to={`/admin/${this.props.match.params.adminId}`}>
       <p>Go Back</p>
       </Link>
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
