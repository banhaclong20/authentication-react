import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TextField from '../ui/TextField';
import OptionSelect from '../ui/OptionSelect';

import { auth, db } from '../../firebase/';

const INITIAL_STATE = {
  first_name: '',
  first_name_error: '',
  last_name: '',
  last_name_error: '',
  phone_number: '',
  phone_number_error: '',
  email: '',
  email_error: '',
  password: '',
  password_error: '',
  confirm_password: '',
  confirm_password_error: '',
  zip_code: '',
  zip_code_error: '',
  error: '',
}

class CreateAccount extends Component {

  state = { 
    currentStep: 0,
    userType: '',
    ...INITIAL_STATE 
  };

  setUserType = (userType) => {
    this.setState({
      userType
    })
  }

  goToNextStep = () => {
    const { currentStep } = this.state;
    if (currentStep < 2) {
      this.setState({
        currentStep: currentStep + 1
      });
    }
  }

  SubmitForm = (e) => {
    const { userType, first_name, last_name, email, phone_number, zip_code, password } = this.state;
    const err = this.validateForm();
    const { history } = this.props;

    if (!err) {
      auth.createUserWithEmailPassword(email, password)
        .then(authUser => {
          db.createUser(authUser.uid, userType, first_name, last_name, email, phone_number, zip_code)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
              history.push('./');
            })
        })
        .catch(error => {
          this.setState(() => ({ error }));
        });
    }  

    e.preventDefault();
  }

  goBackStep = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1
      });
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateForm = () => {
    let isErr = false;
    const errors = {
      first_name_error: '',
      last_name_error: '',
      phone_number_error: '',
      email_error: '',
      password_error: '',
      confirm_password_error: '',
      zip_code_error: '',
    }

    if (!this.state.first_name) {
      isErr = true;
      errors.first_name_error = 'Enter your First Name';
    }

    if (!this.state.last_name) {
      isErr = true;
      errors.last_name_error = 'Enter your Last Name';
    }

    if (!this.state.phone_number) {
      isErr = true;
      errors.phone_number_error = 'Enter your Phone Number';
    }

    if (!this.state.email) {
      isErr = true;
      errors.email_error = 'Enter your Email';
    }

    if (!this.state.password) {
      isErr = true;
      errors.password_error = 'Enter your Password';
    }

    if (!this.state.confirm_password) {
      isErr = true;
      errors.confirm_password_error = 'Confirm your Password';
    }

    if (!this.state.zip_code) {
      isErr = true;
      errors.zip_code_error = 'Enter your Zip Code';
    }

    if (this.state.password !== this.state.confirm_password) {
      isErr = true;
      errors.password_error = 'Password should be the same';
    }

    // TODO - specific Validation like isNumber, isEmail or email & confirm email 
    // should be the same value

    this.setState({
      ...this.state,
      ...errors
    });

    return isErr;

  }

  render() {
    const { currentStep, userType } = this.state;

    console.log(this.state);

    return (
      <div className="layout-page">
        <div className="form__wrapper active transition-in">
        <div className="fade-wrapper">
            {currentStep === 0 &&
              <div className="text-center">
                <h2 className="form-title mb-4">Register</h2>
                <p>Are you a...</p>
                <div className="form-row mt-4 mb-4">
                  <div className="col-12 col-md-6">
                    <OptionSelect 
                      label="Customer" 
                      selected={userType === 'customer'} 
                      onClick={() => { this.setUserType('customer'); }} 
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <OptionSelect 
                      label="Dealer" 
                      selected={userType === 'dealer'} 
                      onClick={() => { this.setUserType('dealer'); }} 
                    />
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-block mt-4" 
                  onClick={this.goToNextStep}
                >
                  Continue
                </button>
              </div>
            }
            {currentStep === 1 &&
              <div>
                <h2 className="form-title">Register</h2>
                <h6 className="text-center">Sign Up to Use All Our Exclusive Services</h6>
                <div className="row">
                  <div className="col">
                    <TextField 
                      className={`${this.state.first_name_error ? "is-invalid" : ""}`} 
                      id="first_name" 
                      placeholder="First Name" 
                      value={this.state.first_name}
                      onChange={e => this.change(e)} 
                      errorText={this.state.first_name_error}
                    />
                  </div>
                  <div className="col">
                    <TextField 
                      className={`${this.state.last_name_error ? "is-invalid" : ""}`} 
                      id="last_name" 
                      placeholder="Last Name" 
                      value={this.state.last_name}
                      onChange={e => this.change(e)} 
                      errorText={this.state.last_name_error}
                    />
                  </div>
                </div>
                <div className="row"> 
                  <div className="col">
                    <TextField 
                      className={`${this.state.phone_number_error ? "is-invalid" : ""}`} 
                      id="phone_number" 
                      placeholder="Phone Number"
                      value={this.state.phone_number} 
                      onChange={e => this.change(e)} 
                      errorText={this.state.phone_number_error}
                    />
                  </div>
                  <div className="col">
                    <TextField 
                      className={`${this.state.email_error ? "is-invalid" : ""}`}
                      id="email" 
                      type="email"
                      placeholder="Email" 
                      value={this.state.email} 
                      onChange={e => this.change(e)} 
                      errorText={this.state.email_error}
                      />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TextField 
                      className={`${this.state.password_error ? "is-invalid" : ""}`}
                      id="password" 
                      type="password"
                      placeholder="Password" 
                      value={this.state.password}
                      onChange={e => this.change(e)} 
                      errorText={this.state.password_error}
                    />
                  </div>
                  <div className="col">
                    <TextField 
                      className={`${this.state.confirm_password_error ? "is-invalid" : ""}`}
                      id="confirm_password" 
                      type="password"
                      placeholder="Confirm Password" 
                      value={this.state.confirm_password}
                      onChange={e => this.change(e)} 
                      errorText={this.state.confirm_password_error}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TextField
                      className={`${this.state.zip_code_error ? "is-invalid" : ""}`} 
                      id="zip_code" 
                      placeholder="Zip Code" 
                      value={this.state.zip_code}
                      onChange={e => this.change(e)} 
                      errorText={this.state.zip_code_error}
                    />
                  </div>
                </div>

                {this.state.error && 
                  <div className="alert alert-danger mt-4" role="alert">
                    <small>{this.state.error}</small>
                  </div>
                }  

                <div className="text-center">
                  <button className="btn btn-outline-secondary mr-2 mt-4 btn-half-width" onClick={this.goBackStep}>Go Back</button>
                  <button className="btn btn-primary mt-4 btn-half-width" onClick={e => this.SubmitForm(e)}>Submit</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )  
  }
}

export default withRouter(CreateAccount);