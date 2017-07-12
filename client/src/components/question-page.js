import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {fetchQuiz} from '../actions';
// import {Link} from 'react-router-dom';



class QuestionPage extends Component {
  //some function questions: are we keeping track of what question we're on in state?
  //if so we'll need an action to update that and the score

  render () {
      return (
        <div className="question">
         //question right here
          <form>  //on submission call some function we check selected answer, increment score, move to next question
           //answers here
          </form>
          //next button
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
