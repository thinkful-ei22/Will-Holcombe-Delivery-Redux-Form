'use strict';
import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import {required, nonEmpty, numbersOnly, fiveChar } from './validators';
import Input from './input';
import {SubmissionError} from 'redux-form';
//import {register} from '../actions';
//<Field name="firstName" component="input" />
// const DemoForm = () => { 
//     return ( 
    //removed export

    //this.props.dispatch(register(values)))}>

    const URL = 'https://us-central1-delivery-form-api.cloudfunctions.net/api/report'
 class DemoForm extends React.Component { 
        

// let returnedMessage = '';

// if (this.props.submitSucceeded) {
//     returnedMessage = <div className="message message-success">Report submitted successfully</div>
// } else if (this.props.submitFailed) {
//     returnedMessage = <div className="message message-error">Delivery not found</div>
// } else {
//     returnedMessage = '';
// }
onSubmit(values) {
    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
            if (
                res.headers.has('content-type') &&
                res.headers
                    .get('content-type')
                    .startsWith('application/json')
            ) {
                // It's a nice JSON error returned by us, so decode it
                return res.json().then(err => Promise.reject(err));
            }
            // It's a less informative error returned by express
            return Promise.reject({
                code: res.status,
                message: res.statusText
            });
        }
        return;
    })
    .then(() => console.log('Submitted with values', values))
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting message'
            })
        );
    });
  }
  render() { 

    let successMessage;
    if (this.props.submitSucceeded) {
        successMessage = (
            <div className="message message-success">
                Message submitted successfully
            </div>
        );
    }

    let errorMessage;
    if (this.props.error) {
        errorMessage = (
            <div className="message message-error">
              {this.props.error}
            </div>
        );
    }
//with this.props.handleSubmit(values => { 
            //console.log('values', values)
            //return register(values)//change to complaint) ?

            return ( 
        <form onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
                {successMessage}
                {errorMessage}
            <div className="form-input">
            <label htmlFor="tracking-number">Please enter your tracking number
                        </label>
                    <Field  
                            component={Input}
                            element="input"
                            validate={[required, nonEmpty, numbersOnly, fiveChar ]}
                            type="text"
                            name="trackingNumber"
                            id="trackingNumber"
                            />
            </div>
            <div className="form-input">
                     <label htmlFor="issue">What is your issue?
                        </label>
                    <Field  
                        component={Input}
                        element="select"
                        name="issue"
                        id="issue">
                            <option value="not-delivered">My delivery hasn't arrived</option>
                            <option value="wrong-item">The wrong item was delivered</option>
                            <option value="missing-part">Part of my order was missing</option>
                            <option value="damaged">Some of my order arrived damaged</option>
                            <option value="other">Other (give details below)</option>
                    </Field>
            </div>
            <div className="form-input">
                    <label htmlFor="details">Give more details (optional)
                        </label>
                        <Field 
                            name="details" 
                            component={Input}
                            element="textarea"
                            type="input"
                            id="details"
                        />
                    
            </div>
                
                <div>
                <button type="submit">Submit</button>
                </div>
        </form>
        );
    }
}

export default reduxForm({
    form: 'demo', 
    initialValues: {issue: "not-delivered"},
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('delivery', Object.keys(errors)[0]))
})(DemoForm)
//every form in your application needs a unique form property value