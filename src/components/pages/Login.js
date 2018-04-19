import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, firebase } from '../../firebase';

import TextField from '../ui/TextField';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleSignIn = (e) => {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true
    });

    auth.signInWithEmailPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .then(() => this.props.history.push('/'))
      .catch(error => {
        this.setState({
          error
        })
      });

    e.preventDefault();
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication failed'
    })
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signInWithGoogle() {
    auth.loginWithGoogle()
      .catch(function (error) {
        console.log(error); 
      });
  }

  signInWithFacebook() {
    auth.loginWithFacebook()
      .then(authData => 
        console.log(authData))
      .catch(function (error) {
        console.log(error); 
      });
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(isLoggedIn => {
      if (isLoggedIn) {
        this.props.history.push("/")
      }
    });
  }

  render() {
    return (
      <div className="layout-page">
        <div className="form__wrapper active">
          <div className="fade-wrapper ">
            <h2 className="form-title-login mb-4">Good to See You Back at RumbleOn!</h2>
            <hr />
            <div className="mb-4" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <a className="social-button" id="facebook-connect" onClick={this.signInWithFacebook}><span>Log in with Facebook</span></a>
              <a className="social-button" id="google-connect" onClick={this.signInWithGoogle}><span>Log in with Google</span></a>
            </div>
            <div className="or"></div>
            <TextField 
              label="Email"
              id="email"
              name="email" 
              value={this.state.email}
              onChange={e => this.change(e)} 
            />
            <TextField 
              id="password" 
              label="Password"
              type="password"  
              name="password"
              value={this.state.password}
              onChange={e => this.change(e)} 
            />
            {this.state.error && 
              <div className="alert alert-danger mt-4" role="alert">
                <small>Something wrong with credential</small>
              </div>
            }  
            <button className="w-100 btn btn-primary mt-4" onClick={this.handleSignIn}>Log In</button>
            <div className="d-flex justify-content-between">
              <Link className="d-inline-block mt-4 small" to="/reset">Forgot password</Link>
              <Link className="d-inline-block mt-4 small" to="/create-account">Don't have an account <b>Sign up</b></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);