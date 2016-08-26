/*
  App

  Holds video and quiz
*/

import React from 'react';
import VideoPage from './VideoPage';
import FirstChild from './FirstChild';
import Quiz from './Quiz';

import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import ReactTransitionGroup from 'react-addons-css-transition-group';
// Firebase
import Rebase  from 're-base';
var base = Rebase.createClass('https://catch-of-the-day.firebaseio.com/');

@autobind
class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      quizShown: true
    }
  }




  toggleQuiz() {
    if (!this.state.quizShown) {
      this.setState({
        quizShown: true
      });
    } else {
      this.setState({
        quizShown: false
      });
    }
  }


  render() {
   

    return (
      <div className="mainApp">
        <ReactTransitionGroup component={FirstChild} transitionName="fade" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
          {!this.state.quizShown ? <VideoPage toggleQuiz={this.toggleQuiz}/> : null}
        </ReactTransitionGroup>
          <div className="quiz">
          <Quiz />
          </div>  
      </div>
    )
  }

};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
