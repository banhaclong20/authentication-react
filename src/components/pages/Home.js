import React from 'react';

const Home = () => {
  return (
    <section className="section-intro bg-home text-white text-center">
      <div className="container d-flex flex-column" style={{minHeight: '80vh'}}>
        <div className="row mt-auto mb-auto">
          <div className="col-lg-8 col-sm-12 text-center mx-auto">
            <h2 className="form-title mb-2" style={{ fontSize: '3em' }}>BUY, SELL, & TRADE MOTORCYCLES</h2>
            <p className="text-center">Instant Cash Offers | Value Pricing | Free Shipping</p>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12 mx-auto text-center mt-4">
            <form className="form-noborder">
              <div className="form-row mb-5">
                <div className="col-lg-6 col-sm-12">
                  <input className="form-control form-control-lg search-input" placeholder="Search by Year, Make, Model, or Color" type="text" style={{ border: 'none', borderRadius: 0 }} />
                </div>
                <div className="col-lg-3 col-sm-12">
                  <select className="custom-select form-control-lg search-select">
                    <option>BUY</option>
                    <option>SELL</option>
                    <option>TRADE</option>
                  </select>
                </div>
                <div className="col-lg-3 col-sm-12">
                  <button className="btn btn-block btn-lg search-btn" type="submit">Search</button>
                </div>
              </div>
            </form>
            <div className="col-lg-12 col-md-12 col-sm-12 text-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <p className="bike-count">12500 Motorcycles to Choose From</p>
            </div>
          </div> 
        </div>
      </div>
    </section>
  )
}

export default Home;