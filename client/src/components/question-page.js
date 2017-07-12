import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementScore, setAnswer, toggleQuizPage} from '../actions';
// import {Link} from 'react-router-dom';



class QuestionPage extends Component {

  validateAnswer(event){
    event.preventDefault();
    const answer = this.props.selectedAnswer;
    const currentCount = this.props.count +1;
    const totalLength = this.props.questions.length;
    let currentScore = this.props.score;
    if(currentCount >= totalLength){
      this.props.dispatch(toggleQuizPage());
    }
    if(answer === this.props.questions[this.props.count].correctAnswer){
      currentScore += 1;
      this.props.dispatch(incrementScore(currentScore, currentCount));
    }
    this.props.dispatch(incrementScore(currentScore, currentCount));
  };

  updateAnswer(event){
    event.preventDefault();
    const answer = event.target.value;
    this.props.dispatch(setAnswer(answer));
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
          <form onSubmit={e => this.validateAnswer(e)}>
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[0]}
                  onChange={e=> this.updateAnswer(e)} />
                  {this.props.questions[i].totalAnswers[0]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[1]}
                  onChange={e=> this.updateAnswer(e)} />
                  {this.props.questions[i].totalAnswers[1]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[2]}
                  onChange={e=> this.updateAnswer(e)} />
                  {this.props.questions[i].totalAnswers[2]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[3]}
                  onChange={e=> this.updateAnswer(e)} />
                  {this.props.questions[i].totalAnswers[3]}       
            <button type='submit'>Submit</button>
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
  count: state.count,
  selectedAnswer: state.selectedAnswer
});

export default connect(mapStateToProps)(QuestionPage);
