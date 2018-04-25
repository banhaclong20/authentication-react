import React from 'react';
import Certified from '../../assets/certified-light-green.svg';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a 
              className={`nav-item nav-link ${activeTab === '1' ? 'active' : ''}`}
              onClick={() => { this.toggle('1'); }}
            >
              What to expect
            </a>
            <a 
              className={`nav-item nav-link ${activeTab === '2' ? 'active' : ''}`}
              onClick={() => { this.toggle('2'); }}
            >
              Description
            </a>
          </div>
        </nav>
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === '1' ? 'show active' : ''}`}>
            This listing contains real photos and descriptions of the vehicle that will be updated with professional photos once it is inspected at our facility. Please check back for the updated description, pictures, and guarantees. If you would like to place a hold on this vehicle until the updated information is available, you may put down a fully refundable deposit. RumbleOn provides a guarantee on every vehicle and will refund your deposit immediately for any reason.
            <div className="card card-small-border mt-3">
              <div className="card-header">
                <img className="mr-2" width="25px" src={Certified} alt="Certified" /> RumbleOn Certified
              </div>
              <div className="card-body">
                <p className="card-text">
                  This bike is RumbleOn Certified.It has been fully inspected by a third party inspection service and comes with a comprehensive Condition Report. This Motorcycle is available at an early bird price discount for a limited time only.
                </p>
                <ul className="mt-3">
                  <li>Available for free shipping to the 48 states</li>
                  <li>Covered by our free 90 - Day Rideability Warranty with extended coverage options.</li>
                  <li>Backed by our 150 - Mile, 3 - Day Money Back Guarantee($499 restocking fee).</li>
                </ul>  
              </div>
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === '2' ? 'show active' : ''}`}>
            <div>
              <div>
                This listing contains real photos of the vehicle and will be updated with a professional condition report once it is inspected at our facility. 
                Please check back for the updated description and guarantees. If you would like to place a hold on this vehicle, you may put down a fully refundable deposit. 
                RumbleOn provides a guarantee on every vehicle and will refund your deposit immediately for any reason. CALL FOR INFORMATION <a href="tel:(888)%20249-0987" target="_blank" rel="noopener noreferrer">(888) 249-0987</a>!!!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}