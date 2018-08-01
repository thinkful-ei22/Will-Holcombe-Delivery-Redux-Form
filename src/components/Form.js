'use strict';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {required, nonEmpty, numbersOnly, fiveChar } from './validators';
import Input from './input';
//<Field name="firstName" component="input" />
// const DemoForm = () => { 
//     return ( 
    //removed export
 class DemoForm extends React.Component { 
        render() { 
            return ( 
        <form onSubmit={this.props.handleSubmit(values => 
            console.log(values))}>
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
    initialValues: {issue: "not-delivered"}
})(DemoForm)
//every form in your application needs a unique form property value