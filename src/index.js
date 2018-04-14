import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import withAuthentication from './components/auth/withAuthentication';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/common.css';
import "./global-styles";

const AppWithAuth = withAuthentication(App);

ReactDOM.render(<AppWithAuth />, document.getElementById('root'));
