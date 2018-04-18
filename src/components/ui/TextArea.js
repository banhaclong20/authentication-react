import React from 'react';

const TextArea = ({ id, value, label, onChange, num }) =>
  <div>
  <label>{label}</label>
    <textarea 
      name={id}
      id={id}
      className="form-control" 
      rows={num}
      value={value}
      onChange={onChange}
    >
    </textarea>
  </div>  

export default TextArea;