import React from 'react';

import TextField from '../ui/TextField';

const ResetPass = () => (
  <div className="form__wrapper active">
    <div className="fade-wrapper ">
      <h2 className="form-title-login mb-4">Forgot your Password?</h2>
      <div className="text-center small mb-4 text-muted">Enter your email address and we will send you a link to reset your password.</div>
      <TextField label="Email Address" id="email" />
      <button className="w-100 btn btn-primary mt-4">Submit</button>
    </div>
  </div>  
);

export default ResetPass;