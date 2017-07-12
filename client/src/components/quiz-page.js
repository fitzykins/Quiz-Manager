import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuiz} from '../actions';
import QuestionPage from './question-page';
// import {Link} from 'react-router-dom';



class QuizPage extends Component {

  componentWillMount() {
    this.props.dispatch(fetchQuiz(this.props.match.params.quizId));
  }

  render() {
    console.log(this.props);
    return (
      <div className="quiz">
        <h2>{this.props.name}</h2>
        <QuestionPage />
      </div>
    )
  }
}
const mapStateToProps= state =>({
  id: state.quizId,
  userId: state.userId,
  name: state.quizName,
  passingScore: state.passingScore,
  questions: state.questions,
  score: state.score
});

export default connect(mapStateToProps)(QuizPage);
