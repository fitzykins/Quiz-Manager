import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementScore, setAnswer, toggleQuizPage, updateQuiz} from '../actions';


class QuestionPage extends Component {

  validateAnswer(event){
    event.preventDefault();
    const answer = this.props.selectedAnswer;
    const currentCount = this.props.count +1;
    const totalLength = this.props.questions.length;
    const userId = this.props.userId;
    const quizName = this.props.name;
    let currentScore = this.props.score;
    const requiredScore = this.props.passingScore;
    const finalScoreCorrect = (((currentScore+1)/totalLength)*100);
    const finalScoreIncorrect =(((currentScore)/totalLength)*100);

    if(currentCount >= totalLength && answer === this.props.questions[this.props.count].correctAnswer && finalScoreCorrect >= requiredScore){
      currentScore += 1;

      this.props.dispatch(toggleQuizPage());
      this.props.dispatch(incrementScore(currentScore, currentCount));
      this.props.dispatch(updateQuiz(quizName, userId, finalScoreCorrect, "Passed"));

    }else if(currentCount >= totalLength && answer !== this.props.questions[this.props.count].correctAnswer && finalScoreIncorrect >= requiredScore){

      this.props.dispatch(toggleQuizPage());
      this.props.dispatch(incrementScore(currentScore, currentCount));
      this.props.dispatch(updateQuiz(quizName, userId, finalScoreIncorrect, "Passed"));

    }else if(currentCount >= totalLength && answer === this.props.questions[this.props.count].correctAnswer && finalScoreCorrect < requiredScore){
      currentScore += 1;

      this.props.dispatch(toggleQuizPage());
      this.props.dispatch(incrementScore(currentScore, currentCount));
      this.props.dispatch(updateQuiz(quizName, userId, finalScoreCorrect, "Failed"));

    }else if(currentCount >= totalLength && answer !== this.props.questions[this.props.count].correctAnswer && finalScoreIncorrect < requiredScore){

      this.props.dispatch(toggleQuizPage());
      this.props.dispatch(incrementScore(currentScore, currentCount));
      this.props.dispatch(updateQuiz(quizName, userId, finalScoreIncorrect, "Failed"));

    }else if(answer === this.props.questions[this.props.count].correctAnswer){
      currentScore += 1;

      this.props.dispatch(incrementScore(currentScore, currentCount));

    }else{
    this.props.dispatch(incrementScore(currentScore, currentCount));
    }
  };

  updateAnswer(event){
    event.preventDefault();
    const answer = event.target.value;

    this.props.dispatch(setAnswer(answer));
  };

  render () {
    console.log(this.props.userId);
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
                  onChange={e=> this.updateAnswer(e)}
                  checked={this.props.selectedAnswer === this.props.questions[i].totalAnswers[0]} />
                  {this.props.questions[i].totalAnswers[0]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[1]}
                  onChange={e=> this.updateAnswer(e)}
                  checked={this.props.selectedAnswer === this.props.questions[i].totalAnswers[1]} />
                  {this.props.questions[i].totalAnswers[1]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[2]}
                  onChange={e=> this.updateAnswer(e)}
                  checked={this.props.selectedAnswer === this.props.questions[i].totalAnswers[2]} />
                  {this.props.questions[i].totalAnswers[2]}
            <input type='radio' name='questions' 
                  value={this.props.questions[i].totalAnswers[3]}
                  onChange={e=> this.updateAnswer(e)} 
                  checked={this.props.selectedAnswer === this.props.questions[i].totalAnswers[3]} />
                  {this.props.questions[i].totalAnswers[3]}       
            <button type='submit'>Submit</button>
          </form>
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
  score: state.score,
  count: state.count,
  selectedAnswer: state.selectedAnswer
});

export default connect(mapStateToProps)(QuestionPage);
