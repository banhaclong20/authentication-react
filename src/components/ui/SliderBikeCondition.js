import 'rc-slider/assets/index.css';

import React from 'react';
import Slider from 'rc-slider';

const style = { width: 600, margin: '10px 50px 50px 50px' };

function log(value) {
  console.log(value); //eslint-disable-line
}

const marks = {
  0: <strong>Ridden Hard</strong>,
  25: 'Below Average',
  50: 'Average',
  75: 'Above Average',
  100: {
    label: <strong>Flawless</strong>,
  },
};

export const SliderBike = () =>
  <div>
    <div style={style}>
      <p>Physical Condition</p>
      <Slider min={0} marks={marks} step={null} onChange={log} defaultValue={0} />
    </div>
    <div style={style}>
      <p>Mechanical Condition</p>
      <Slider min={0} marks={marks} step={null} onChange={log} defaultValue={0} />
    </div>
    <div style={style}>
      <p>Tire Condition</p>
      <Slider min={0} marks={marks} step={null} onChange={log} defaultValue={0} />
    </div>
  </div>

