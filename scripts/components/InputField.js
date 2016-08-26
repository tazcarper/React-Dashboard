/* 
  InputField
  This will let us make <InputField/>

  Input Field
*/

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';
import Formsy from 'formsy-react';
import reactMixin from 'react-mixin';

@autobind
class InputField extends React.Component {

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  }

  errorMessage(){
    if (this.isFormSubmitted()){
      if (!this.state._isValid){
       return this.props.validationError;
      }
      else {
        return;
      }
    }
  }

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    // const errorMessage = this.isFormSubmitted()  ? this.getErrorMessage() : null;
    
    return (
        <div className={className + ' form-group'}>
          <input id={this.props.name} type="text" className="form-control" onChange={this.changeValue} placeholder={this.props.title} value={this.getValue()}/>
          <span>{this.errorMessage()}</span>
        </div>
    )
  }
}

reactMixin.onClass(InputField, Formsy.Mixin);

export default InputField;
