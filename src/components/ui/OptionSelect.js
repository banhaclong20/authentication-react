import React from 'react';

const OptionSelect = ({ label, onClick, selected }) => (
  <div 
    className={`box__container card card-body ${selected ? 'box--selected' : ''}`}
    onClick={onClick}
  >
    <h3 className="box__title align-middle">{label}</h3>
  </div>  
);

export default OptionSelect;

