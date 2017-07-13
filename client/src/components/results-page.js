import React, {Component} from 'react';
import {connect} from 'react-redux';

class ResultsPage extends Component {

  render(){

    let status;
    let score = ((this.props.score/this.props.count)*100);
    let requiredScore = this.props.passingScore;

    if(score >= requiredScore){
      status = <p>Congratulations! You have <b>Passed!</b></p>
    }
    if(score < requiredScore){
      status = <p>We are sorry, you have <b>Failed</b>.</p>
    }

    return(
      <div>
        <h3>Results</h3>
        <p>You got a score of {score}!</p>
        {status}
      </div>
    );
  }
}

const mapStateToProps= state =>({
  passingScore: state.passingScore,
  questions: state.questions,
  score: state.score,
  count: state.count
});

export default connect(mapStateToProps)(ResultsPage);
