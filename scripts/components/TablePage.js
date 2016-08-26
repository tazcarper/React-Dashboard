/* 
  TablePage
  This will let us make <TablePage/>

  Main Table Page
*/

import React from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import TableItem from './TableItem';


@autobind
class TablePage extends React.Component {

  constructor() {
    
    super();

    this.state = {
      canSubmit: false,
      loginShown: false
    }
  }

  render() {
    return(
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="tableContainer text-left">
            <h1>Campaigns</h1>
            <TableItem/>
          </div> 
        </div>
      </div>
    </div>
      
    )
  }
}

reactMixin.onClass(TablePage, History);

export default TablePage;
