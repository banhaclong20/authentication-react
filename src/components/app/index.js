import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import ResetPass from '../pages/ResetPassword';
import Header from '../header';
import Footer from '../footer';
import AccountDetail from '../account';
import PasswordChange from '../pages/PasswordChange';
import SellVehicle from '../pages/SellVehicle';
import BuyVehicle from '../pages/BuyVehicle';
import DetailPage from '../pages/DetailPage';
import ScrollTop from '../pages/ScrollTop';

import withAuthentication from '../auth/withAuthentication';


const App = () => (
  <Router>
    <ScrollTop>
      <div>
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/reset" component={ResetPass} />
            <Route path="/account-detail" component={AccountDetail} />
            <Route path="/password-change" component={PasswordChange} />
            <Route path="/sell-vehicle" component={SellVehicle} />
            <Route path="/buy-vehicle" component={BuyVehicle} />
            <Route path="/:id" component={DetailPage} />
          </Switch>  
        </Wrapper>
        <Footer /> 
      </div>
    </ScrollTop>    
  </Router>  
);

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  .transition-group {
    position: relative;
    background: #f7f8f9;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default withAuthentication(App);