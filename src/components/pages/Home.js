import React from 'react';
import '../../styles/common.css';

import checkAuthorization from '../auth/checkAuthorization';

const Home = () => (
  <div className="section">
    You are at the homepage!
  </div>  
);

const authCondition = (isLoggedIn) => !!isLoggedIn;

export default checkAuthorization(authCondition)(Home);