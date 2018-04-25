import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollTop extends Component {
  componentDidUpdate(preProps) {
    if (this.props.location !== preProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollTop);