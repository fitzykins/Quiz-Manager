import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';
import {Link} from 'react-router-dom';



class UserPage extends Component {

  componentWillMount() {
    console.log('User Id', this.props.match.params.userId);
    this.props.dispatch(fetchUser(this.props.match.params.userId));
  }

  render () {
    if(!this.props.quizzes) {
      return <p>anything</p>;
    }
    const quizzes = this.props.quizzes.map((quiz,index) => (
      <li key={index}>
        <Link to={`/quizzes/${quiz.id}`}>
         {quiz.quiz}
        </Link>
        <p>Status: {quiz.status}</p>
      </li>
    ));
      return (
        <div>
         <h3>{this.props.userName}</h3>
          <ul>
           {quizzes}
          </ul>
        </div>
      )
  }
}
const mapStateToProps= state =>({
  id: state.id,
  userName: state.userName,
  quizzes: state.quizzes
});

export default connect(mapStateToProps)(UserPage);
