import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'rc-slider';
import { firebase, db } from '../../firebase/';

import CreateAccount from '../pages/CreateAccountSellPage';
import TextField from '../ui/TextField';
import ColorSelect from '../ui/ColorSelect';
import Radio from '../ui/Radio';
import TextArea from '../ui/TextArea';
import PreviewImage from '../ui/PreviewImage';

import 'rc-slider/assets/index.css';
import { ChevronRight, ChevronLeft, Truck } from 'react-feather';
import bike_img from '../../assets/design-bike.png';
 
const style = { width: 520, margin: '20px 50px 50px 50px' };

const marks = {
  0: { label: <strong>Ridden Hard</strong> },
  25: 'Below Average',
  50: 'Average',
  75: 'Above Average',
  100: { label: <strong>Flawless</strong> },
};

const INITIAL_STATE = {
  currentStep: 0,
  nextStep: null,
  preStep: null,
  uid: '',
  user: '',
  data: [],
  make: '',
  model: '',
  model_type: '',
  year: '',
  price: '',
  vin: '',
  vin_error: '',
  showVINError: false,
  mileage: '',
  mileage_error: '',
  color: '',
  color_error: '',
  loan: '',
  loan_error: '',
  bank_name: '',
  bank_name_error: '',
  loan_balance: '',
  loan_balance_error: '',
  physical_condition: 0,
  physical_condition_str: '',
  mechanical_condition: 0,
  mechanical_condition_str: 0,
  tire_condition: 0,
  tire_condition_str: 0,
  accessories: '',
  services: '',
  more_info: '',
  note: '',
  error: '',
  image: 'Please upload image',
  imageUrl: null,
  image_right_side: 'Please upload image',
  imageUrl_right: null
}

class SellVehicle extends Component {

  state = { 
    ...INITIAL_STATE 
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(isLoggedIn => {
      isLoggedIn
        ? this.setState(() => ({ 
          user: isLoggedIn.email,
          uid: isLoggedIn.uid,
        }))
        : this.setState(() => ({ 
          user: '',
          uid: '', 
        }));
    });
  }

  goToStep2 = e => {
    let goStep = true;
    const { currentStep, loan } = this.state;
    const err = this.validateStep1();
    if (err) {
      goStep = false;
      e.preventDefault();
    } else if (currentStep < 4 && goStep === true) {
      this.setState({
        currentStep: currentStep + 1,
      });
    }

    // Reset Value for Loan info
    if (loan === "no" || loan === "Dontknow") {
      this.setState({ bank_name: '', loan_balance: '' })
    }
  }

  goToStep3 = e => {
    let goStep = true;
    const { currentStep } = this.state;
    const err = this.validateStep1();

    if (err) {
      goStep = false;
      // e.preventDefault();
    } else if (currentStep < 4 && goStep === true) {
      this.setState({
        currentStep: currentStep + 1
      });
    }

    this.updatePhysicalCondition();
    this.updateMechanicalCondition();
    this.updateTireCondition();
  }

  async SubmitForm(e) {
    const { 
      uid, 
      user, 
      make, 
      model, 
      model_type, 
      year, 
      price, 
      vin, 
      mileage, 
      color, 
      loan, 
      bank_name, 
      loan_balance, 
      physical_condition_str, 
      mechanical_condition_str, 
      tire_condition_str, 
      accessories, 
      services, 
      more_info,
      image,
      image_right_side
    } = this.state;
    const err = this.validateStep1();
    const { history } = this.props;

    if (!err) {

      await this.uploadImageRightSide();

      await firebase.storage.child(`bikes/${image.name}_${new Date().getTime()}`).put(image).then((snapshot) => {
        db.submitBike(vin, uid, user, make, model, model_type, year, price, vin, mileage, color, loan, bank_name, loan_balance, physical_condition_str, mechanical_condition_str, tire_condition_str, accessories, services, more_info, snapshot.metadata.downloadURLs[0], image_right_side)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push('./');
          })
      });  
    }  

    e.preventDefault();
  }

  uploadImageRightSide = () => {
    const { image_right_side } = this.state;

    firebase.storage.child(`bikes/${new Date().getTime()}`).put(image_right_side).then((snapshot) => {
      this.setState({
        image_right_side: snapshot.metadata.downloadURLs[0]
      })
    });
  }

  goBackStep = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1
      });
    }
  }

  fetchVehicleDetail = () => {
    const { vin } = this.state;
    if (vin && vin.length >= 16) {
      fetch(`https://consumerapi.rumbleon.com/api/BookValues/getNadaModels?Vin=${vin}&UserId=0`)
      .then(res => res.json())
      .then(respone => this.setState(
        { data: respone[0],
          vin_error: '',
          make: respone[0].Make.toString(),
          model: respone[0].Model.toString(),
          model_type: respone[0].ModelType.toString(),
          year: respone[0].Year.toString(),
          price: respone[0].AverageRetail.toString(),
        }
      ));
    } else {
      this.vinValidation(vin);
    }
  }

  vinValidation = vin => {
    if (!vin) {
      this.setState({ 
        showVINError: true,
        vin_error: 'VIN can not be empty',
      });
    } else if (vin.length < 16) {
      this.setState({ 
        showVINError: true,
        vin_error: 'VIN is not valid',
      });
    }

    // Reset state to hide the bike info and form in step 1
    this.setState({
      data: '',
      make: '',
      model: '',
      loan: '',
    })
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeColor = e => {
    this.props.onSelectChange(e.target.value);
  }

  handleSelect = value => {
    this.setState({ color: value });
  }

  handleRadioChange = value => {
    this.setState({ loan: value });
  }

  onUpdatePhysical = value => {
    this.setState({ physical_condition: value })
  }

  onUpdateMechanical = value => {
    this.setState({ mechanical_condition: value })
  }

  onUpdateTire = value => {
    this.setState({ tire_condition: value })
  }

  onChangeTextArea = e => {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }

  processImage = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      console.log(file);
      this.setState({
        image: file,
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  processimage_right_side = e => {
    let reader = new FileReader();
    let file1 = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image_right_side: file1,
        imageUrl_right: reader.result
      });
    };
    reader.readAsDataURL(file1);
  }

  validateStep1 = () => {
    let isErr = false;
    const errors = {
      vin_error: '',
      mileage_error: '',
      color_error: '',
      loan_error: '',
    }

    if (!this.state.vin) {
      isErr = true;
      errors.vin_error = 'Enter VIN number';
    }

    if (!this.state.mileage) {
      isErr = true;
      errors.mileage_error = 'Enter Mileage';
    }

    if (!this.state.color) {
      isErr = true;
      errors.color_error = 'Select the color';
    }

    // TODO - specific Validation like isNumber, isEmail or email & confirm email 
    // should be the same value

    this.setState({
      ...this.state,
      ...errors
    });

    return isErr;

  }

  updatePhysicalCondition = () => {
    const { physical_condition } = this.state;

    switch (physical_condition) {
      case 0: 
        return this.setState({ physical_condition_str: "Ridden Hard" });
      case 25:
        return this.setState({ physical_condition_str: "Below Average" });
      case 50:
        return this.setState({ physical_condition_str: "Average" });
      case 75:
        return this.setState({ physical_condition_str: "Above Average" });
      case 100:
        return this.setState({ physical_condition_str: "Flawless" });
      default:
        return this.setState({ physical_condition_str: physical_condition });
    }
  }

  updateMechanicalCondition = () => {
    const { mechanical_condition } = this.state;

    switch (mechanical_condition) {
      case 0: 
        return this.setState({ mechanical_condition_str: "Ridden Hard" });
      case 25:
        return this.setState({ mechanical_condition_str: "Below Average" });
      case 50:
        return this.setState({ mechanical_condition_str: "Average" });
      case 75:
        return this.setState({ mechanical_condition_str: "Above Average" });
      case 100:
        return this.setState({ mechanical_condition_str: "Flawless" });
      default:
        return this.setState({ mechanical_condition_str: mechanical_condition });
    }
  }

  updateTireCondition = () => {
    const { tire_condition } = this.state;

    switch (tire_condition) {
      case 0: 
        return this.setState({ tire_condition_str: "Ridden Hard" });
      case 25:
        return this.setState({ tire_condition_str: "Below Average" });
      case 50:
        return this.setState({ tire_condition_str: "Average" });
      case 75:
        return this.setState({ tire_condition_str: "Above Average" });
      case 100:
        return this.setState({ tire_condition_str: "Flawless" });
      default:
        return this.setState({ tire_condition_str: tire_condition });
    }
  }

  render() {
    const {
      user,
      vin,
      vin_error,
      data, 
      make,
      model,
      currentStep, 
      color, 
      loan, 
      physical_condition,
      mechanical_condition,
      tire_condition,
      accessories,
      services,
      more_info,
      image,
      imageUrl
    } = this.state;
    
    console.log(this.state);

    const nextStep = currentStep + 1;
    const preStep = currentStep - 1;

    console.log('currentStep: ', currentStep, 'nextStep: ', nextStep, 'pre step: ', preStep);

    let allowContinueStep4;

    if (user) {
      allowContinueStep4 = accessories !== '' && services !== '';
    } else {
      allowContinueStep4 = accessories !== '' && services !== '' && more_info !== '';
    }
    
    return (
      <div className="container sell-page" style={{maxWidth: '700px', marginTop: '4em', marginBottom: '4em', minHeight: '60vh'}}>
          <h2 className="form-title mb-2">SELL YOUR MOTORCYCLE</h2>
          <p className="text-center">Enter Your Vehicle's Information and Get a Cash Offer in Minutes.</p>
          <div className="step-tittle">
            <div className="step-span step-1">
              <div>
                <span className={`${currentStep === 0 ? 'number active' : 'number'}`}>1</span>
                <span className={`${currentStep === 0 ? 'step-text-active' : ''}`}>Basic Info</span>
              </div>
            </div>
            <div className="step-span step-2">
              <div>
                <span className={`${currentStep === 1 ? 'number active' : 'number'}`}>2</span>
                <span className={`${currentStep === 1 ? 'step-text-active' : ''}`}>Condition</span>
              </div>
            </div>
            <div className="step-span step-3">
              <span className={`${currentStep === 2 ? 'number active' : 'number'}`}>3</span>
              <span className={`${currentStep === 2 ? 'step-text-active' : ''}`}>Accessories & Services</span>
            </div>
            <div className="step-span step-4">
              <span className={`${currentStep === 3 ? 'number active' : 'number'}`}>4</span>
              <span className={`${currentStep === 3 ? 'step-text-active' : ''}`}>Photo</span> 
            </div>
            <div className="step-span step-5">
              <span className={`${currentStep === 4 ? 'number active' : 'number'}`}>5</span>
              <span className={`${currentStep === 4 ? 'step-text-active' : ''}`}>Finish</span>
            </div>
          </div>
					{currentStep === 0 &&
						<div className="section-step">
							<div className="step-content">
                <div className="row mb-4 mt-4">
                  <div className="col-12 col-md-9">
                      <TextField 
                        className={`${vin_error ? "is-invalid" : ""}`} 
                        id="vin" 
                        placeholder="VIN" 
                        value={vin}
                        onChange={e => this.change(e)} 
                        errorText={vin_error}
                      />
                    </div> 
                    <div className="col-12 col-md-3">
                      <button 
                        type="submit" 
                        className="btn btn-secondary btn-block"
                        onClick={this.fetchVehicleDetail}
                      >
                        Submit
                      </button>
                    </div>
                    
                    {/* Show bike info from api */}
                    {data.Model && 
                    <div className="col-12 col-md-12" style={{ margin: '1em 0 -1.5em 0'}}>
                      <div className="alert alert-vin" key={data.ModelID}>
                          <Truck /> Your Vehicle: {data.Year} {data.Make} {data.Model}
                      </div>
                    </div>
                    }
                </div>
                { make &&
                <div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <TextField 
                        className={`${this.state.mileage_error ? "is-invalid" : ""}`} 
                        id="mileage" 
                        placeholder="Please Enter Mileage on the Odometer" 
                        value={this.state.mileage}
                        onChange={e => this.change(e)} 
                        errorText={this.state.mileage_error}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <ColorSelect 
                        errorClassName={this.state.color_error === '' ? true : false}
                        value={color} 
                        onSelectChange={this.handleSelect}
                        errorText={this.state.color_error} 
                      />
                    </div>
                  </div>
                  <div className="row mt-3 mb-2">
                    <div className="col-12 col-md-12 radio-container">
                      <small className="text-muted">Do you have an outstanding loan on this motorcycle?</small>
                      <div className="form-check mt-2">
                        <Radio value={loan} onRadioChange={this.handleRadioChange} />
                      </div>
                    </div> 
                  </div>
                </div>
                }

                {!make &&
                  <div className="row pb-3">
                    <div className="col-12 col-md-6">
                      <h6>Where is my VIN?</h6>
                      <small>
                        Your motorcycle's VIN consists of seventeen numbers and letters, and can be located either on the steering neck (below the handle bars) or on the motor near the bottom of the cylinders. The VIN can also be found on your insurance card.
                      </small>
                    </div>
                    <div className="col-12 col-md-6">
                      <img 
                        src={bike_img}
                        alt="Bike" 
                        style={{ width: '100%'}}
                      />
                    </div>
                  </div>
                }

                {loan === "yes" && 
                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <TextField 
                        className={`${this.state.bank_name_error ? "is-invalid" : ""}`} 
                        id="bank_name" 
                        placeholder="Name of the bank the loan is through" 
                        value={this.state.bank_name}
                        onChange={e => this.change(e)} 
                        errorText={this.state.bank_name_error}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <TextField 
                        className={`${this.state.loan_balance_error ? "is-invalid" : ""}`} 
                        id="loan_balance" 
                        placeholder="Remaining Loan Balance " 
                        value={this.state.loan_balance}
                        onChange={e => this.change(e)} 
                        errorText={this.state.loan_balance_error}
                      />
                    </div>
                  </div>
                } 
							</div>
              {model && 
                <div className="d-flex">
                  <button 
                    className="btn btn-primary ml-auto btn-block" 
                    onClick={e => this.goToStep2(e)}
                  >
                    Continue <ChevronRight />
                  </button>
                </div>
              }

						</div>
          }
          
          {/* Step 2 */}
					{currentStep === 1 &&
						<div className="section-step">
							<div className="step-content" style={{ marginBottom: '1em'}}>
                <div>
                  <div style={style}>
                    <p>Physical Condition</p>
                    <Slider min={0} marks={marks} step={null} onChange={this.onUpdatePhysical} defaultValue={0} value={physical_condition} />
                  </div>
                  <div style={style}>
                    <p>Mechanical Condition</p>
                    <Slider min={0} marks={marks} step={null} onChange={this.onUpdateMechanical} defaultValue={0} value={mechanical_condition} />
                  </div>
                  <div style={style}>
                    <p>Tire Condition</p>
                    <Slider min={0} marks={marks} step={null} onChange={this.onUpdateTire} defaultValue={0} value={tire_condition} />
                  </div>
                </div>
              </div>

              {this.state.error && 
                <div className="alert alert-danger mt-4" role="alert">
                  <small>{this.state.error}</small>
                </div>
              }  

							<div className="text-center">
								<button className="btn btn-outline-secondary mr-2 mt-4 btn-half-width" onClick={this.goBackStep}><ChevronLeft /> Go Back</button>
								<button className="btn btn-primary mt-4 btn-half-width" onClick={e => this.goToStep3(e)}>Continue <ChevronRight /></button>
							</div>
						</div>
          }
          {/* Step 3 */}
          {currentStep === 2 &&
            <div className="section-step note-container">
              <div className="step-content" style={{ marginBottom: '1em', padding: '15px 20px 20px'}}>
                <div className="row">
                  <div className="col-12 col-md-12 mb-4">
                    <TextArea  
                      id="accessories"
                      name="accessories"
                      label="Tell us what accessories you added to your motorcycle."
                      onChange={e => this.onChangeTextArea(e)}
                      value={this.state.accessories}
                      num="4"
                    />
                  </div>
                  <div className="col-12 col-md-12 mb-4">
                    <TextArea  
                      id="services"
                      name="services"
                      label="Tell us all services done to your motorcycle."
                      onChange={e => this.onChangeTextArea(e)}
                      value={this.state.services}
                      num="4"
                    />
                  </div>

                  {
                    user === "" ? 
                    <div className="col-12 col-md-12">
                      <TextArea  
                        id="more_info"
                        name="more_info"
                        label="Anything else you would like to add about your bike?"
                        onChange={e => this.onChangeTextArea(e)}
                        value={this.state.more_info}
                        num="4"
                      />
                    </div> : 
                    null
                  }        
                </div>

                {this.state.error && 
                  <div className="alert alert-danger mt-4" role="alert">
                    <small>{this.state.error}</small>
                  </div>
                }  
              </div>
							<div className="text-center">
								<button className="btn btn-outline-secondary mr-2 mt-4 btn-half-width" onClick={this.goBackStep}><ChevronLeft /> Go Back</button>
                <button 
                  className="btn btn-primary mt-4 btn-half-width" 
                  onClick={e => this.goToStep3(e)}
                  disabled={allowContinueStep4 ? "" : "disabled"}
                >
                  Continue <ChevronRight />
                </button>
							</div>
            </div>
          }
          
          {/* Step 4 - Photo upload */}
          {currentStep === 3 &&
            <div className="section-step note-container">
              <div className="step-content" style={{ marginBottom: '1em', padding: '15px 20px 20px'}}>
                <div className="row">
                  <div className="col-12 col-md-12 mb-2">
                    <p className="text-muted" style={{ fontSize: '0.9em'}}>Upload photos of your motorcycle by clicking on each image below (Optional).</p>
                    <hr />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <div className="custom-file">
                      <input 
                        id="image"
                        type="file" 
                        name="image"
                        className="custom-file-input"
                        placeholder="Upload Bike Image" 
                        value={this.state.image_front}
                        onChange={e => this.processImage(e)} 
                      />
                      <label className="custom-file-label" style={{ marginRight: 0 }} htmlFor="image">Front Image</label>
                    </div>
                    <button 
                      className="btn btn-secondary btn-block mt-3" 
                      onClick={e => this.uploadImageFront(e)}
                    >
                      Save Front Image <ChevronRight />
                    </button>
                  </div>  
                  <div className="col-12 col-md-6 mb-4">
                    <div className="custom-file">
                      <input 
                        id="image_right_side"
                        type="file" 
                        name="image"
                        className="custom-file-input"
                        placeholder="Upload Bike Image 1" 
                        onChange={e => this.processimage_right_side(e)} 
                      />
                      <label className="custom-file-label" style={{ marginRight: 0 }} htmlFor="image">Choose Right Side Image</label>
                    </div>
                    <button 
                      className="btn btn-secondary btn-block mt-3" 
                      onClick={e => this.uploadImageRightSide(e)}
                    >
                      Save Right Side Image <ChevronRight />
                    </button>
                  </div>
                  <div className="col-12 col-md-12 mb-2 text-center">
                    <PreviewImage image={image} imageURL={imageUrl} />
                  </div>      
                </div>

                {this.state.error && 
                  <div className="alert alert-danger mt-4" role="alert">
                    <small>{this.state.error}</small>
                  </div>
                }  
              </div>
							<div className="text-center">
								<button className="btn btn-outline-secondary mr-2 mt-4 btn-half-width" onClick={this.goBackStep}><ChevronLeft /> Go Back</button>
                <button 
                  className="btn btn-primary mt-4 btn-half-width" 
                  onClick={e => this.goToStep3(e)}
                  disabled={allowContinueStep4 ? "" : "disabled"}
                >
                  Continue <ChevronRight />
                </button>
							</div>
            </div>
          }
          

          {/* Step 5 - Finish */}
          {currentStep === 4 &&
            <div className="section-step note-container">
              <div className="step-content" style={{ marginBottom: '1em', padding: '15px 20px 20px'}}>
                {
                  user !== "" ? 
                  <div className="col-12 col-md-12">
                    <TextArea  
                      id="more_info"
                      name="more_info"
                      label="Anything else you would like to add about your bike?"
                      onChange={e => this.onChangeTextArea(e)}
                      value={this.state.more_info}
                      num="4"
                    />
                  </div> : 
                  <CreateAccount />
                } 
                {this.state.error && 
                  <div className="alert alert-danger mt-4" role="alert">
                    <small>{this.state.error}</small>
                  </div>
                }  
              </div>
							<div className="text-center">
								<button className="btn btn-outline-secondary mr-2 mt-4 btn-half-width" onClick={this.goBackStep}><ChevronLeft /> Go Back</button>
                <button 
                  className="btn btn-primary mt-4 btn-half-width" 
                  onClick={e => this.SubmitForm(e)}
                  disabled={allowContinueStep4 ? "" : "disabled"}
                >
                  Submit <ChevronRight />
                </button>
							</div>
            </div>
					}
      </div>  
    )  
  }
}

export default withRouter(SellVehicle);