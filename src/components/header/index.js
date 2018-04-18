import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SignOut } from '../../firebase/auth';
import AuthUserContext from '../auth/AuthUserContext';

import logo from '../../assets/rumbleon-logo.svg';

const Header = () => 
  <AuthUserContext.Consumer>
    {isLoggedIn => isLoggedIn
      ? <HeaderAuth />
      : <HeaderNonAuth />
    }
  </AuthUserContext.Consumer>

const HeaderAuth = () => 
  <Nav>
    <div className="logo">
      <Link to="/"><div><img className="logo" src={logo} alt="RumbleOn logo" /></div></Link>
      <Link to="/sell-vehicle" className="sell-menu"><span>Sell</span></Link>
      <Link to="/buy-vehicle" className="sell-menu"><span>Buy</span></Link>
    </div>
    <div className="nav">
      <ul>
        <li>
          <Link to="/account-detail"><span>Account</span></Link>
        </li>
        <li>
          {/* <span className="ml-3 text-light small">Welcome ...</span> */}
          <button className="btn btn-outline-success" onClick={() => SignOut()}>
            Sign Out
          </button>
        </li>       
      </ul>
    </div>
  </Nav>  

const HeaderNonAuth = () => 
  <Nav>
    <div className="logo">
      <Link to="/"><div><img className="logo" src={logo} alt="RumbleOn logo" /></div></Link>
      <Link to="/sell-vehicle" className="sell-menu"><span>Sell</span></Link>
      <Link to="/buy-vehicle" className="sell-menu"><span>Buy</span></Link>
    </div>
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
  </Nav>  

const Nav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #0D6D52;
  border-bottom: 1px solid #e0e0e0;

  .logo {
    color: #FFF;
    margin-left: 10px;
    margin-right: 2em;
    font-size: 1.2em;
    display: flex;
    flex-direction: row;

    a {
      text-decoration: none;
    }

    .sell-menu {
      color: #FFF;
      font-size: 0.8em;
      text-transform: uppercase;
      justify-content: center;
      align-items: center;
      display: flex;
      margin-left: 1em;

      span {
        border: 1px solid #1e614d;
        padding: 6px 30px;
        background: #0b8863;
        border-radius: 20px;
        font-size: 0.85em;
        letter-spacing: .1em;
        min-width: 120px;
        text-align: center;
      }
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