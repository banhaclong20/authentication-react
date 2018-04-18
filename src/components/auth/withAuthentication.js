import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase/';

const withAuthentication = (Component) => 
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoggedIn: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(isLoggedIn => {
        isLoggedIn
          ? this.setState(() => ({ isLoggedIn }))
          : this.setState(() => ({ isLoggedIn: null }));
      });
    }

    render() {
      const { isLoggedIn } = this.state;

      console.log('authentication info ', isLoggedIn);

      return (
        <AuthUserContext.Provider value={isLoggedIn}>
          <Component />
        </AuthUserContext.Provider>

        
      );
    }
  }

export default withAuthentication;
