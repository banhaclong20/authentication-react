import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../auth/AuthUserContext';
import checkAuthorization from '../auth/checkAuthorization';
import { db } from '../../firebase';

import no_image from '../../assets/no_image.png';
import default_avatar from '../../assets/default-avatar.png';

class AccountDetail extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;
    console.log(this.props.isLoggedIn);
    return (
      <AuthUserContext.Consumer>
        {isLoggedIn => isLoggedIn
          ? <div className="mb-4">
              <section className="section-pagetop bg-tittle">
                <div className="container text-center">
                  <h5 className="custom-heading">Dashboard Account</h5>
                  <p className="small">Welcome back, {isLoggedIn.email}</p>
                </div>
              </section>

              <div id="wrapper" className="animate">
                <nav className="navbar header-top navbar-expand-lg navbar-dark bg-dark">
                  <span className="navbar-toggler-icon leftmenutrigger"></span>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav animate side-nav">
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Menu<i className="shortmenu animate"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#0">Action</a>
                          <a className="dropdown-item" href="#0">Another action</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#0">Something else here</a>
                        </div>
                      </li>
                    </ul>
                    <ul className="navbar-nav ml-md-auto d-md-flex">
                      <li className="nav-item">
                        <Link to="/password-change">Edit Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/password-change">Password Change</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container-fluid x mt-4">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="card">
                        <figure className="itemside">
                          <div className="aside">
                            <div className="img-wrap">
                              {isLoggedIn && isLoggedIn.photoURL !== null ? 
                              <img className="mg-sm" src={isLoggedIn.photoURL} alt={`${isLoggedIn.displayName.toLowerCase()} profile pic`} /> : 
                              <img className="mg-sm" style={{width: '180px', position: 'relative', top: '1em'}} src={no_image} alt="no_img" /> }
                            </div>
                          </div>
                          <figcaption className="text-wrap align-self-center">
                            <h5 className="card-title mt-2">My Information</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Email: {isLoggedIn.email}</h6>
                            {isLoggedIn.displayName && <h6 className="card-subtitle mb-2 text-muted">Name: {isLoggedIn.displayName}</h6>}
                            <a href="#0">More details</a>
                          </figcaption>
                        </figure> 
                      </div>
                    </div>
                    <div className="col">
                    <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Edit Information</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Email: {isLoggedIn.email}</h6>
                          {isLoggedIn.displayName && <h6 className="card-subtitle mb-2 text-muted">Name: {isLoggedIn.displayName}</h6>}
                          
                          <a href="#0" className="card-link">Change Password</a>
                          <a href="#0" className="card-link">Edit Info</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">List of Users</h5>
                          { users && <UsersList users={users} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          : null
        }
      </AuthUserContext.Consumer>  
    );
  }
}

const UsersList = ({ users }) =>
  <div>
    <table className="table user-table">
      <thead>
        <tr>
          <th scope="col">Thumbnail</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Zip Code</th>
          <th scope="col">User Type</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(users).map(key => 
          <tr key={users[key].email}>
            <th scope="row"><img style={{width: '60px'}} src={default_avatar} alt="default-avatar" /></th>
            <td>{users[key].first_name}</td>
            <td>{users[key].last_name}</td>
            <td>{users[key].email}</td>
            <td>{users[key].phone_number}</td>
            <td>{users[key].zip_code}</td>
            <td style={{textTransform: 'capitalize'}}>{users[key].userType}</td>
          </tr>
        )}
      </tbody>
    </table> 
  </div>  
 
const authCondition = (isLoggedIn) => !!isLoggedIn;  

export default checkAuthorization(authCondition)(AccountDetail);