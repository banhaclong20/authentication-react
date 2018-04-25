import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

import Description from '../pages/Description';

import { Home } from 'react-feather';
import Certified from '../../assets/certified-light-green.svg';

class DetailPage extends Component {

  state = {
    bike_detail: {},
    description: {},
  }

  componentDidMount() {
    db
      .onceGetBikeDetail(this.props.match.params.id)
      .then(snapshot => this.setState(() => ({ bike_detail: snapshot.val() })));
  }

  goBack = () => {
    this.props.history.goBack();
    console.log('test');
  }

  render() {
    const { vin, make, model, pics, image_1, year, color, model_type, mileage  } = this.state.bike_detail;
    console.log(this.state.bike_detail)

    console.log(this.state.description)

    return (
      <div className="dp-container" style={{ backgroundColor: '#f9f9f9'}}>
        <div className="buy-vehicle">
          <ol className="breadcrumb" style={{ borderRadius: 0 }}>
            <li className="breadcrumb-item">
              <Link to="/"><Home size={18} /></Link>
            </li>
            <li className="breadcrumb-item">
              <a style={{cursor: 'pointer'}} onClick={this.goBack}>Buy</a>
            </li>
            <li className="breadcrumb-item">{model}</li>
          </ol>
        </div>

        <div className="detail-page-content">
          <div className="card detail-page-container">
            <div className="row no-gutters">
              <aside className="col-sm-5 border-right center-thumb">
                <article className="gallery-wrap"> 
                <div className="img-big-wrap">
                  <div><img src={pics} style={{ maxWidth: '550px'}} alt="photo_gallery" /></div>
                </div> 
                <div className="img-small-wrap">
                  <div className="item-gallery"> <img src={image_1 ? image_1 : pics} alt="photo_gallery" /></div>
                  <div className="item-gallery"> <img src={pics} alt="photo_gallery" /></div>
                  <div className="item-gallery"> <img src={pics} alt="photo_gallery" /></div>
                  <div className="item-gallery"> <img src={pics} alt="photo_gallery" /></div>
                </div> 
                </article> 
              </aside>
              <aside className="col-sm-7">
                <article className="p-4">
                  <h3 className="title mb-3">{year} {make} {model}</h3>
                  <hr />
                  <img className="mr-2" width="30px" src={Certified} alt="Certified" /> <span className="text-success">RumbleOn Certified</span>
                  <hr />
                  <div className="price-detail-wrap"> 
                    <div className="h3 price"> 
                      <span className="">US $</span><span className="">1299</span>
                    </div> 
                  </div> 
                  <dl className="row">
                    <dt className="col-sm-3">VIN</dt>
                    <dd className="col-sm-9">{vin}</dd>

                    <dt className="col-sm-3">Model Code</dt>
                    <dd className="col-sm-9">321312321</dd>

                    <dt className="col-sm-3">Mileage</dt>
                    <dd className="col-sm-9">{mileage}</dd>

                    <dt className="col-sm-3">Color</dt>
                    <dd className="col-sm-9">{color}</dd>

                    <dt className="col-sm-3">Stock#</dt>
                    <dd className="col-sm-9">{vin}</dd>

                    <dt className="col-sm-3">Model Type</dt>
                    <dd className="col-sm-9">{model_type}</dd>
                  </dl>
                  <hr />
                  <a href="#0" className="btn btn-lg btn-outline-primary mr-4"> <i className="fas fa-heart mr-3"></i>Favorite</a>
                  <a href="#0" className="btn btn-lg btn-outline-dark"> <i className="fas fa-hand-paper mr-3"></i>Hold</a>
                  <hr />
                  <a href="#0" className="btn btn-lg btn-primary mr-2"> Start Purchase </a>
                </article> 
              </aside> 
            </div> 
          </div> 
        </div>

        <div className="detail-page-content" style={{marginTop: '1em'}}> 
          <Description />
        </div>

        <div className="detail-page-content">
          <div className="card-deck">
            <div className="card card-small-border">
              <img className="card-img-top" src="https://www.rumbleon.com/HttpImageHandler.ashx?makeTypeId=1&bucketId=5&isMobile=1&imageUrl=https://content.homenetiol.com/2001817/2127273/640x480/96c3bdcbe8964356aba4b039d2f9d436.jpg" alt="similar-bikes" />
              <div className="card-body">
                <h5 className="card-title">2012 Kawasaki ZX1000HCF Ninja 1000</h5>
                <p className="card-text">This bike is RumbleOn Certified.It has been fully inspected by a third party inspection service and comes with a comprehensive Condition Report</p>
                <a href="#0" className="card-link">Detail</a>
              </div>
            </div>
            <div className="card card-small-border">
              <img className="card-img-top" src="https://www.rumbleon.com/HttpImageHandler.ashx?makeTypeId=1&bucketId=5&isMobile=1&imageUrl=https://content.homenetiol.com/2001817/2127273/640x480/f6f0f43824084323a7fb8513695d94f7.jpg" alt="similar-bikes" />
              <div className="card-body">
                <h5 className="card-title">2012 Kawasaki ZX1000HCF Ninja 1000</h5>
                <p className="card-text">This bike is RumbleOn Certified.It has been fully inspected by a third party inspection service and comes with a comprehensive Condition Report.</p>
                <a href="#0" className="card-link">Detail</a>
              </div>
            </div>
            <div className="card card-small-border">
              <img className="card-img-top" src="https://www.rumbleon.com/HttpImageHandler.ashx?makeTypeId=1&bucketId=5&isMobile=1&imageUrl=https://content.homenetiol.com/2001817/2127273/640x480/a6449def772f4ff8ae2b3e097cdc63ff.jpg" alt="similar-bikes" />
              <div className="card-body">
                <h5 className="card-title">2012 Kawasaki ZX1000HCF Ninja 1000</h5>
                <p className="card-text">This bike is RumbleOn Certified.It has been fully inspected by a third party inspection service and comes with a comprehensive Condition Report.</p>
                <a href="#0" className="card-link">Detail</a>
              </div>
            </div>
            <div className="card card-small-border">
              <img className="card-img-top" src="https://www.rumbleon.com/HttpImageHandler.ashx?makeTypeId=1&bucketId=5&isMobile=1&imageUrl=https://content.homenetiol.com/2001817/2127273/640x480/00a87d59a9d34e6b805833f585255fdf.jpg" alt="similar-bikes" />
              <div className="card-body">
                <h5 className="card-title">2012 Kawasaki ZX1000HCF Ninja 1000</h5>
                <p className="card-text">This bike is RumbleOn Certified.It has been fully inspected by a third party inspection service and comes with a comprehensive Condition Report.</p>
                <a href="#0" className="card-link">Detail</a>
              </div>
            </div>
          </div>
        </div> 


      </div>  
    );
  }
}

export default DetailPage;