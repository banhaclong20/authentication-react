import React from 'react';
import '../../styles/common.css';

import checkAuthorization from '../auth/checkAuthorization';

const Home = () => (
  <div className="transition-group">
    <div className="section">
      You are at the homepage!
    </div>  
  </div>
);

const authCondition = (isLoggedIn) => !!isLoggedIn;

export default checkAuthorization(authCondition)(Home);