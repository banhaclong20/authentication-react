import React from 'react';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ResetPass from './pages/ResetPassword';

const Container = ({ location }) => (
  <Wrapper>
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <section className="route-section">
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/reset" component={ResetPass} />
          </Switch>      
        </section>  
      </CSSTransition>  
    </TransitionGroup>  
  </Wrapper>  
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

  div.transition-group {
    position: relative;
    background: #f7f8f9;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default withRouter(Container);