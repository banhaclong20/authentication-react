import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from './../assets/rumbleon-logo.svg';

import { firebase } from '../firebase';
import { SignOut } from '../firebase/auth';

class Header extends Component {

  state = {
    isLoggedIn: null
  };

  componentDidMount() {

    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }

  renderStatusUser() {
    switch (this.state.isLoggedIn) {
      case true:
        return (
          <div className="nav">
            <ul>
              <li>
                {/* <span className="ml-3 text-light small">Welcome ...</span> */}
                <button className="btn btn-outline-success" onClick={() => SignOut()}>
                  Sign Out
                </button>
              </li>       
            </ul>
          </div>
        );
      case false:
        return (
          <div className="nav">
            <ul>
              <li>
                <Link to="/login"><span>Sign In</span></Link>
              </li>
              <li>
                <Link to="/create-account">Sign Up</Link>
              </li> 
            </ul>
          </div> 
        )
      default:
        return <h6>Loading...</h6>
    }
  }

  render() {
    return (
      <Nav>
        <div className="logo">
          <Link to="/"><div><img className="logo" src={logo} alt="RumbleOn logo" /></div></Link>
        </div>
        {this.renderStatusUser()}   
      </Nav>  
    );
  }
};

const Nav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #0D6D52;
  border-bottom: 1px solid #e0e0e0;

  .logo {
    color: #FFF;
    margin-left: 10px;
    font-size: 1.2em;

    a {
      text-decoration: none;
    }
  }

  .nav {
    position: absolute;
    right: 2em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-left: 20px;

    a {
      text-decoration: none;
      font-size: 15px;
      color: #FFF;
      padding: 10px;

      .logo {
        width: 140px;
      }
    }

    img {
      position: relative;
      width: 140px;
    }
  }
`;

export default Header;