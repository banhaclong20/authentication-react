import React from 'react';

import { auth } from '../../firebase/';
import TextField from '../ui/TextField';

const INITIAL_STATE = {
  email: '',
  error: '',
  success: false,
};

class ResetPass extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    const { email } = this.state;
    
    auth.passwordReset(email)
      .then(() => {
        this.setState(() => ({   
          email: '',
          error: '',
          success: true, 
        }));
      })
      .catch(error => {
        this.setState({
          error
        })
      });

    e.preventDefault();
  }

  render() {
    const { email, error } = this.state;
    const isSubmitValid = email === '';

    console.log(this.state);

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form__wrapper active">
          <div className="fade-wrapper ">
            <h2 className="form-title-login mb-4">Forgot your Password?</h2>
            <div className="text-center small mb-4 text-muted">Enter your email address and we will send you a link to reset your password.</div>
            <TextField 
              label="Email Address" 
              id="email" 
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />

            {error ? 
              <div className="alert alert-danger mt-4" role="alert">
                { error && <small>{error.message}</small> }
              </div> : null
            }

            {this.state.success ? 
              <div className="alert alert-success mt-4" role="alert">
                Check your email to reset the password
              </div> : null
            }

            <button 
              disabled={isSubmitValid} 
              className="w-100 btn btn-primary mt-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>  
      </form>  
    );
  }
}

export default ResetPass;