import React from 'react';

class Radio extends React.Component {
  handleChange = e => 
    this.props.onRadioChange(e.target.value);

  render() {
    const { value } = this.props;
    return (
      <div>
        <label>
          <input
            type="radio"
            value="yes"
            className="form-check-input"
            checked={value === 'yes'}
            onChange={this.handleChange}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            value="no"
            className="form-check-input"
            checked={value === 'no'}
            onChange={this.handleChange}
          />
          No
        </label>

        <label>
          <input
            type="radio"
            value="Dontknow"
            className="form-check-input"
            checked={value === 'Dontknow'}
            onChange={this.handleChange}
          />
          Don't Know
        </label>
      </div>  
    );
  }
}

export default Radio;