import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-sm-4 col-md-4">
            <ul className="list-unstyled quick-links">
              <li><a href="#0">SELL</a></li>
              <li><a href="#0">BUY</a></li>
              <li><a href="#0">FINANCE</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <ul className="list-unstyled quick-links">
              <li><a href="#0">Careers</a></li>
              <li><a href="#0">Contact Us</a></li>
              <li><a href="#0">Investor Relations</a></li>
              <li><a href="#0">About Us</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <Link to="https://play.google.com/store/apps/details?id=com.halcyontek.rumbleon.login">
              <img src="https://d1yjuhtlaqyg7l.cloudfront.net/images/google_play_badge@2x.png" width="140" alt="RumbleOn Google Play" />
            </Link>
            <br /> <br />
            <Link to="https://itunes.apple.com/us/app/rumbleon/id1219198993?ls=1&mt=8">
              <img src="https://d1yjuhtlaqyg7l.cloudfront.net/images/App_Store_Badge@2x.png" width="140" alt="RumbleOn App Store" />
            </Link>
          </div>
        </div>
      </div>
      </section>
      <section id="copyright">
        <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
          <p>© 2017 RumbleOn, All rights reserved</p>
        </div>
      </section> 
    </div> 
  );
}

export default Footer;