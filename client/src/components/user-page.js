import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';
import {Link} from 'react-router-dom';

import '../CSS/user.css';

class UserPage extends Component {
  checkLogin() {
    if(!this.props.userId) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.checkLogin();
    this.props.dispatch(fetchUser(this.props.userId));
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  render () {
    if(!this.props.quizzes) {
      return <p>anything</p>;
    }
    const quizzes = this.props.quizzes.map((quiz,index) => (
      <li key={index} className="user-quizzes">
        <Link className="user-link" to={`/quizzes/${quiz.id}`}>
         <b>{quiz.quiz}</b>
        </Link>
        <p><i>Status</i>: <b>{quiz.status}</b></p>
      </li>
    ));
      return (
        <div className="user-container">
         <h3>{this.props.userName}</h3>
          <ul className="user-quiz-list">
           {quizzes}
          </ul>
        </div>
      )
  }
}
const mapStateToProps= state =>({
  userId: state.userId,
  userName: state.userName,
  quizzes: state.quizzes
});

export default connect(mapStateToProps)(UserPage);
