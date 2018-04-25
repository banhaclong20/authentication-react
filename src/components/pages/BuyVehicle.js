import React, { Component } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

class BuyPage extends Component {
  state = {
    bikes: null
  };

  componentDidMount() {
    db
      .onceGetBikes()
      .then(snapshot => this.setState(() => ({ bikes: snapshot.val() })));
  }

  render() {
    const { bikes } = this.state;
    console.log("Bike: ", bikes);
    return (
      <div className="mb-4">
        <section className="section-content bg padding-y mt-4">
          <div className="container-fluid buy-vehicle">
            <div className="row">
              <aside className="col-sm-2">
                <div className="card card-filter">
                  <article className="card-group-item">
                    <header className="card-header">
                      <a
                        aria-expanded="true"
                        href="#0"
                        data-toggle="collapse"
                        data-target="#collapse22"
                      >
                        <i className="icon-action fa fa-chevron-down" />
                        <h6 className="title">By Make and Model</h6>
                      </a>
                    </header>
                    <div className="filter-content collapse show" id="collapse22">
                      <div className="card-body">
                        <ul className="list-default list-lg">
                          <li>
                            <a href="#0">
                              HARLEY-DAVIDSON
                              <span className="float-right badge badge-light round">
                                142
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="#0">
                              HONDA
                              <span className="float-right badge badge-light round">
                                123
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="#0">
                              KAWASAKI
                              <span className="float-right badge badge-light round">
                                132
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="#0">
                              SUZUKI
                              <span className="float-right badge badge-light round">
                                102
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </article>
                  <article className="card-group-item">
                    <header className="card-header">
                      <a
                        href="#0"
                        data-toggle="collapse"
                        data-target="#collapse33"
                      >
                        <i className="icon-action fa fa-chevron-down" />
                        <h6 className="title">By Price </h6>
                      </a>
                    </header>
                    <div className="filter-content collapse show" id="collapse33">
                      <div className="card-body">
                        <input
                          type="range"
                          className="custom-range"
                          min="0"
                          max="100"
                          name=""
                        />
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>Min</label>
                            <input
                              className="form-control"
                              id="inputEmail4"
                              placeholder="$0"
                              type="number"
                            />
                          </div>
                          <div className="form-group text-right col-md-6">
                            <label>Max</label>
                            <input
                              className="form-control"
                              placeholder="$1,0000"
                              type="number"
                            />
                          </div>
                        </div>
                        <button className="btn btn-block btn-outline-primary">
                          Apply
                        </button>
                      </div>
                    </div>
                  </article>
                  <article className="card-group-item">
                    <header className="card-header">
                      <a
                        href="#0"
                        data-toggle="collapse"
                        data-target="#collapse44"
                      >
                        <i className="icon-action fa fa-chevron-down" />
                        <h6 className="title">By Categories </h6>
                      </a>
                    </header>
                    <div className="filter-content collapse show" id="collapse44">
                      <div className="card-body">
                        <form>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              value=""
                              type="checkbox"
                            />
                            <span className="form-check-label">
                              <span className="float-right badge badge-light round">
                                5
                              </span>
                              Cruisers
                            </span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              value=""
                              type="checkbox"
                            />
                            <span className="form-check-label">
                              <span className="float-right badge badge-light round">
                                13
                              </span>
                              Touring
                            </span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              value=""
                              type="checkbox"
                            />
                            <span className="form-check-label">
                              <span className="float-right badge badge-light round">
                                12
                              </span>
                              Sportbikes
                            </span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              value=""
                              type="checkbox"
                            />
                            <span className="form-check-label">
                              <span className="float-right badge badge-light round">
                                32
                              </span>
                              3 Wheel Cycle
                            </span>
                          </label>
                        </form>
                      </div>
                    </div>
                  </article>
                </div>
              </aside>
              <main className="col-sm-10">
                {bikes && <UsersList bikes={bikes} match={this.props.match}/>}
              </main>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const UsersList = ({ bikes, match }) => (
  <div>
    {Object.keys(bikes).map(key => (
      <article className="card card-product" key={bikes[key].vin}>
        <div className="card-body">
          <div className="row">
            <aside className="col-sm-3">
              <div className="img-wrap">
                <img src={bikes[key].pics} alt={bikes[key].pics} />
              </div>
            </aside>
            <article className="col-sm-6">
              <h4 className="title">
                {bikes[key].year} {bikes[key].make} {bikes[key].model}
              </h4>
              <dl className="param param-feature">
                <dt>VIN</dt>
                <dd>{bikes[key].vin}</dd>
              </dl>
              <dl className="param param-feature">
                <dt>Mileage</dt>
                <dd>{bikes[key].mileage}</dd>
              </dl>
              <dl className="param param-feature">
                <dt>Color</dt>
                <dd>{bikes[key].color}</dd>
              </dl>
              <dl className="param param-feature">
                <dt>Model Type</dt>
                <dd>{bikes[key].model_type}</dd>
              </dl>
            </article>
            <aside className="col-sm-3 border-left">
              <div className="action-wrap">
                <div className="price-wrap h4">
                  <span className="price"> {bikes[key].price} </span>
                  <del className="price-old"> $98</del>
                </div>
                <p className="text-success">Free shipping</p>
                <br />
                <p>
                  <Link
                    className="btn btn-primary"
                    to={`${bikes[key].vin}`}
                  >
                    Buy now
                  </Link>
                  <Link
                    className="btn btn-secondary"
                    to={`${bikes[key].vin}`}
                  >
                    Details
                  </Link>
                </p>
                <a href="#0" className="text-muted">
                  <i className="fa fa-heart" /> Add to wishlist
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>
    ))}
  </div>
);

export default BuyPage;
