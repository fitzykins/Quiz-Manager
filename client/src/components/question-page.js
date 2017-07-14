import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incrementScore, setAnswer, toggleQuizPage, updateQuiz} from '../actions';
import '../CSS/question-page.css';

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
    const answerOne = this.props.questions[this.props.count].totalAnswers[0];
    const answerTwo = this.props.questions[this.props.count].totalAnswers[1];
    const answerThree = this.props.questions[this.props.count].totalAnswers[2];

    if(answer === answerOne){
      this.props.dispatch(setAnswer(answer, "answer selected", "answer", "answer", "answer"));
    }else if(answer === answerTwo){
      this.props.dispatch(setAnswer(answer, "answer", "answer selected", "answer", "answer"));
    }else if(answer === answerThree){
      this.props.dispatch(setAnswer(answer, "answer", "answer", "answer selected", "answer"));
    }else{
      this.props.dispatch(setAnswer(answer, "answer", "answer", "answer", "answer selected"));
    }
  };
  
  render () {
    let i = this.props.count;
    console.log(this.props.selectedAnswer);
    if(this.props.questions.length === 0) {
      return <p>Could not load questions</p>;
    }
    
      return (
        <section className='container'>
          <div className="question">
          {this.props.questions[i].question}
            <form className='question-list'>
              <button className={this.props.answerOne}
                      value={this.props.questions[i].totalAnswers[0]}
                      onClick={e=> this.updateAnswer(e)} >
                {this.props.questions[i].totalAnswers[0]}
              </button>
              <button className={this.props.answerTwo}
                      value={this.props.questions[i].totalAnswers[1]}
                      onClick={e=> this.updateAnswer(e)} >
                {this.props.questions[i].totalAnswers[1]}
              </button>
              <button className={this.props.answerThree}
                      value={this.props.questions[i].totalAnswers[2]}
                      onClick={e=> this.updateAnswer(e)} >
                {this.props.questions[i].totalAnswers[2]}
              </button>
              <button className={this.props.answerFour}
                      value={this.props.questions[i].totalAnswers[3]}
                      onClick={e=> this.updateAnswer(e)} >
                {this.props.questions[i].totalAnswers[3]}
              </button>
            </form>
            <form onSubmit={e => this.validateAnswer(e)}>
              <button className="submit" type='submit'>Submit</button>
            </form>
          </div>
          <p className='question-number'>Question #{(i+1)} out of {this.props.questions.length}</p>
        </section>
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
  selectedAnswer: state.selectedAnswer,
  answerOne: state.answerOne,
  answerTwo: state.answerTwo,
  answerThree: state.answerThree,
  answerFour: state.answerFour
});

export default connect(mapStateToProps)(QuestionPage);
