import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const checkAuthorization = condition => Component => {
  class CheckAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(isLoggedIn => {
        if (!condition(isLoggedIn)) {
          this.props.history.push('./login');
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          { isLoggedIn => isLoggedIn ? <Component /> : null }
        </AuthUserContext.Consumer>  
      );
    }
  }

  return withRouter(CheckAuthorization);
}

export default checkAuthorization;
