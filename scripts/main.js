import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import TablePage from './components/TablePage';




/*
  Routes
*/ 

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={TablePage} />
    <Route path="*" component={TablePage}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
