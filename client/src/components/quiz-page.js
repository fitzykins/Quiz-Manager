import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuiz, resetTest} from '../actions';
import QuestionPage from './question-page';
import ResultsPage from './results-page';
import '../CSS/quiz-page.css';
// import {Link} from 'react-router-dom';



class QuizPage extends Component {
  checkLogin() {
    if(!this.props.userId) {
      this.props.history.push('/');
      return true;
    }
    return false;
  }

  componentDidMount() {
    if(!this.checkLogin()){
      this.props.dispatch(resetTest());
      this.props.dispatch(fetchQuiz(this.props.match.params.quizId));
    }
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  render () {
    let results;
    let quiz;
    if(this.props.showResults){
      results = <ResultsPage />
    }
    if(this.props.showQuiz){
      quiz = <QuestionPage />
    }
      return (
        <div className="quiz">
          <h2>{this.props.name}</h2>
          {quiz}
          {results}
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
  showResults: state.showResults,
  showQuiz: state.showQuiz

});

export default connect(mapStateToProps)(QuizPage);
