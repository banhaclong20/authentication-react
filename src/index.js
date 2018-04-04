import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Wrapper from './components/Wrapper';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/common.css';
import "./global-styles";

const App = () => (
  <Router>
    <div>
      <Header />
      <Wrapper />
    </div>  
  </Router>  
)

ReactDOM.render(<App />, document.getElementById('root'));
