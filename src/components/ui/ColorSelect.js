import React from 'react';

class ColorSelect extends React.Component {
  handleSelectChange = e => {
    this.props.onSelectChange(e.target.value)
  }

  render() {
    const { value, errorText, errorClassName } = this.props;

    return (
      <div className={errorClassName === false ? 'was-validated' : ''}>
        <select value={value} onChange={this.handleSelectChange} className="custom-select" required >
          <option value="">Which color best matches your bike</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="brown">Brown</option>
          <option value="copper">Copper</option>
          <option value="gold">Gold</option>
          <option value="gray">Gray</option>
          <option value="green">Green</option>
          <option value="maroon">Maroon</option>
          <option value="orange">Orange</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
          <option value="silver">Silver</option>
          <option value="tan">Tan</option>
          <option value="teal">Teal</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
        </select>
        <div className="invalid-feedback" style={{display: 'block'}}>{errorText}</div>
      </div>
    );
  }
 }

 export default ColorSelect;