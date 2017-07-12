import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementCount} from '../actions';
// import {Link} from 'react-router-dom';



class QuestionPage extends Component {
  //some function questions: are we keeping track of what question we're on in state?
  //if so we'll need an action to update that and the score

  validateAnswer(event){
    const answer = event.target.value;
    if(answer === this.props.questions[this.props.count].correctAnswer){
      // this.props.score += 1;
      console.log("Correct!");
    }
  }

  nextQuestion(event) {
    event.preventDefault();
    const currentCount = this.props.count +1;
    this.props.dispatch(incrementCount(currentCount));
  };

  render () {
    console.log("this is our props", this.props);
    let i = this.props.count;
  
    if(this.props.questions.length === 0) {
      return <p>Could not load questions</p>;
    }
      return (
        <div className="question">
         {this.props.questions[i].question}
          <form onClick={e => this.validateAnswer(e)}>
           <input type='radio' name='questions' value={this.props.questions[i].totalAnswers[0]} />{this.props.questions[i].totalAnswers[0]}
           <input type='radio' name='questions' value={this.props.questions[i].totalAnswers[1]} />{this.props.questions[i].totalAnswers[1]}
           <input type='radio' name='questions' value={this.props.questions[i].totalAnswers[2]} />{this.props.questions[i].totalAnswers[2]}
           <input type='radio' name='questions' value={this.props.questions[i].totalAnswers[3]} />{this.props.questions[i].totalAnswers[3]}
          </form>
          <form onClick={e => this.nextQuestion(e)}>
            <button>Next</button>
          </form>
        </div>



      )
  }
}
const mapStateToProps= state =>({
  id: state.quizId,
  name: state.quizName,
  passingScore: state.passingScore,
  questions: state.questions,
  score: state.score,
  count: state.count
});

export default connect(mapStateToProps)(QuestionPage);
