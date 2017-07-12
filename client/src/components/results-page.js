import React, {Component} from 'react';
import {connect} from 'react-redux';

class ResultsPage extends Component {

  render(){

    return(
      <div>These are our results</div>
    );
  }
}

const mapStateToProps= state =>({
  id: state.quizId,
  name: state.quizName,
  passingScore: state.passingScore,
  questions: state.questions,
  score: state.score,
  count: state.count,
  selectedAnswer: state.selectedAnswer
});

export default connect(mapStateToProps)(ResultsPage);