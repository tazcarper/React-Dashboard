/* 
  TableItem
  This will let us make <TableItem/>

  TableItem
*/

import React from 'react';

import autobind from 'autobind-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import help from '../helpers';
import {Table,Tr,Td, Th, Thead, Sort, unsafe} from './reactable';
import Moment from 'moment';


@autobind
class TableItem extends React.Component {

  constructor() {
    
    super();
    // Money in cents
    this.state = {
      selectedRows: {},
      filters : [],
      dataSet: [{
        id: 1,
        name: "Row One",
        clicks: "45002",
        cost_per_acquisition: {
          value: "326",
          goal: "200"
        },
        spend: "38078",
        start_date: "2016-04-20 10:00 PM UTC",
        status: "PAUSED"
      }, {
        id: 2,
        name: "Row Two",
        clicks: "304238",
        cost_per_acquisition: {
          value: "250",
          goal: "200" 
        },
        spend: "80728", 
        start_date: "2016-04-21 12:03 PM UTC",
        status: "ACTIVE"
      }, 
      {
        id: 3,
        name: "Three really really really really really really really really really long",
        clicks: "304238",
        cost_per_acquisition: {
          value: "250",
          goal: "200" 
        },
        spend: "80728", 
        start_date: "2016-04-21 12:03 PM UTC",
        status: "ACTIVE"
      },
      {
        id: 4,
        name: "Row Four",
        clicks: "45002",
        cost_per_acquisition: {
          value: "326",
          goal: "200"
        },
        spend: "38078",
        start_date: "2016-04-20 10:00 PM UTC",
        status: "PAUSED"
      }, {
        id: 5,
        name: "Row Five",
        clicks: "304238",
        cost_per_acquisition: {
          value: "250",
          goal: "200" 
        },
        spend: "80728", 
        start_date: "2016-04-21 12:03 PM UTC",
        status: "ACTIVE"
      }, 
      {
        id: 6,
        name: "Six",
        clicks: "304238",
        cost_per_acquisition: {
          value: "250",
          goal: "200" 
        },
        spend: "80728", 
        start_date: "2016-04-21 12:03 PM UTC",
        status: "ACTIVE"
      }
      ]
    }
  }

  addCat(key){
    let catItemArray = [];
     key.map(function(e){
       catItemArray.push(e.key);
    })
    this.setState({
      filters: catItemArray
    })
  }



  selectedRow(key) {

    console.log(key)
    let getRows = this.state.selectedRows;
    let curRows = this.state.dataSet;
    let addIt;

    getRows.map(function(selectedRow, index){
      console.log('g')
      if (selectedRow.id == key){
        getRows.splice(index,1);
        addIt = false;
      }
      else {
       addIt = true;
      }
    })

    if (addIt){
      curRows.map(function(e) {
        console.log(e.id)
        if(e.id == key){
          getRows.push(e);
        }
      });
    }

   

  }

  // Build selected row list
  getCheckedRows(key, input){
   
    let selectedRowObj = this.state.selectedRows;
    let data = this.state.dataSet;
    if (input.target.checked){
      selectedRowObj['row_'+ key.id] = key;
       this.setState({ selectedRows : selectedRowObj });
    }
    else {
      selectedRowObj['row_'+ key.id] = null;
      delete selectedRowObj['row_'+ key.id];
      this.setState({ selectedRows : selectedRowObj });
    }

  }



  buildRow (key) {
    let itemID = key.id;
    let start = Moment(key.start_date).format('MMMM Do YYYY, h:mm a');
  

    
    return (
      
      <Tr key={itemID} thisID={itemID} addThisItem={this.addCat}  >
        

        <Td key={itemID + key.name}  column="Campaign Name" value={help.truncateText(key.name, 20)}>
        <div>

        <input type="checkbox" className="rowCheck" key={itemID + 'input'} onChange={this.getCheckedRows.bind(this,key)} /> 
        {help.truncateText(key.name, 20)}
        </div>
        </Td>
        <Td key={itemID + help.parseTime(key.start_date)} column="Start Date" className="start_date">{start}</Td>
        <Td key={itemID + key.clicks} column="Clicks" className="clicks" >{help.toThousands(key.clicks)}</Td>
        <Td key={itemID + key.cost_per_acquisition.goal} column="Goal" className="goal">{help.formatPrice(key.cost_per_acquisition.goal)}</Td>
        <Td key={itemID + key.cost_per_acquisition.value} column="CPA" className="cpa">{help.formatPrice(key.cost_per_acquisition.value)}</Td>
        <Td key={itemID + key.spend} column="Spend" className="spend">{help.formatPrice(key.spend)}</Td>
      </Tr>
    )
   
  }


  filterIt(key){
    
    let searchValue = key.target.value;
    this.setState({
      filterValue: searchValue
    })
  }

 




  render() {



    return(
      <div className="tableContainer">
     
      <Table className="table" 
      sortable={true} 
      hideFilterInput={true} 
      filterable={this.state.filters} 
      filterBy={this.state.filterValue}
      itemsPerPage={3} pageButtonLimit={1}
      getFilterString={this.filterIt}
      curSelect={this.state.selectedRows}
      >
     
        { this.state.dataSet.map(this.buildRow) }
        </Table>
      </div> 
    )
  }
}



export default TableItem;
