import React from 'react';

const TextField = ({ id, value, className, label, type, placeholder, onChange, errorText }) => (
  <div>
    <label className="form-label" htmlFor={id}>{label}</label>
    <input 
      type={type ? type : "text"} 
      id={id} 
      name={id}
      className={`form-control ${className}`} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <div className="invalid-feedback">{errorText}</div>
  </div>        
)

export default TextField;