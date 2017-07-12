import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {fetchQuiz} from '../actions';
// import {Link} from 'react-router-dom';



class QuestionPage extends Component {


  render () {
      return (
        <div className="question">
        </div>

      )
  }
}
const mapStateToProps= state =>({
  id: state.quizId,
  name: state.quizName,
  passingScore: state.passingScore,
  questions: state.questions,
  score: state.score
});

export default connect(mapStateToProps)(QuestionPage);
