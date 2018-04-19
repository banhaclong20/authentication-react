import React, { Component } from 'react';
import TextField from '../ui/TextField';
import { auth } from '../../firebase';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
      error: null,
      success: false,
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    const { password } = this.state;
    auth.passwordUpdate(password) 
      .then(() => {
        this.setState({ 
          password: '',
          confirm_password: '',
          error: null,
          success: true,
         })        
      })
      .catch(error => {
        this.setState({
          error
        })
      });

    e.preventDefault();
  }

  render() {
    const { password, confirm_password, error, success } = this.state;
    const isSubmitValid = password !== confirm_password || password === '';

    console.log(this.state);

    return (
      <form onSubmit={this.onSubmit}>
        <div className="layout-page">
          <div className="form__wrapper active">
            <div className="fade-wrapper ">
              <h2 className="form-title-login mb-4">Update new Password</h2>
              <TextField 
                id="password" 
                name="password"
                placeholder="Enter the new Password"
                value={this.state.password}
                onChange={e => this.change(e)}
              />

              <TextField 
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm your password"
                value={this.state.confirm_password}
                onChange={e => this.change(e)}
              />

              {error ? 
                <div className="alert alert-danger mt-4" role="alert">
                  { error && <small>{error.message}</small> }
                </div> : null
              }

              {success ? 
                <div className="alert alert-success mt-4" role="alert">
                  Your password is successful updated.
                </div> : null
              }

              <button 
                disabled={isSubmitValid} 
                className="w-100 btn btn-primary mt-4"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>    
      </form>  
    );
  }
}

export default PasswordChange;