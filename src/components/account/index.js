import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../auth/AuthUserContext';
import checkAuthorization from '../auth/checkAuthorization';

const AccountDetail = () => 
  <AuthUserContext.Consumer>
    {isLoggedIn => isLoggedIn
      ? <div>
          <h5>Account of {isLoggedIn.email}</h5>
          <Link to="/password-change">Password Change</Link>
        </div>
      : null
    }
  </AuthUserContext.Consumer>  

const authCondition = (isLoggedIn) => !!isLoggedIn;  

export default checkAuthorization(authCondition)(AccountDetail);