import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TextField from '../ui/TextField';
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
    ...INITIAL_STATE 
  };

  SubmitForm = (e) => {
    const { first_name, last_name, email, phone_number, zip_code, password } = this.state;
    const err = this.validateForm();
    const { history } = this.props;

    if (!err) {
      auth.createUserWithEmailPassword(email, password)
        .then(authUser => {
          db.createUser(authUser.uid, first_name, last_name, email, phone_number, zip_code)
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
    return (
      <div>
        <h5 className="mb-3">Last step!</h5>
        <h6 className="mb-3">
          Enter your information to create your account and submit your motorcycle details. Once logged in, you will be able to track the process of receiving your cash offer!
        </h6>
        <small>
          All fields are required to create a RumbleOn account.
        </small>  
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
        <div className="row mt-4">
          <div className="col">
            <p style={{fontSize: '0.8em', color: '#565656' }}>
              By signing up, I agree to RumbleOn’s <a className="custom-link" href="https://www.rumbleon.com/content/pdfs/Terms_and_Conditions.pdf?__hstc=133935633.dcbe8e7451ab10e90269b7302392749a.1517452398852.1523567759583.1523998095196.159&amp;__hssc=133935633.13.1523998095196&amp;__hsfp=3183743550" target="_blank">Terms</a> and Privacy Policy. I also authorize RumbleOn and its affiliates to text or call me. We may also use your phone number with an auto-dialer.
            </p>
          </div>    
        </div>

        {this.state.error && 
          <div className="alert alert-danger mt-4" role="alert">
            <small>{this.state.error}</small>
          </div>
        }  
      </div>
    )  
  }
}

export default withRouter(CreateAccount);