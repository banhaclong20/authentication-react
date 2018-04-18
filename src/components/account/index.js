import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../auth/AuthUserContext';
import checkAuthorization from '../auth/checkAuthorization';
import { db } from '../../firebase';

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
          ? <div>
              <h5>Account of {isLoggedIn.email}</h5>
              <Link to="/password-change">Password Change</Link>

              { !!users && <UsersList users={users} />}
            </div>
          : null
        }
      </AuthUserContext.Consumer>  
    );
  }
}

const UsersList = ({ users }) =>
  <div>
    <h4>List of User</h4>

    {Object.keys(users).map(key => 
      <div key={key}>
        {users[key].first_name} {users[key].last_name} {users[key].email} {users[key].phone_number} {users[key].userType}
      </div>
    )}
  </div>  

 
const authCondition = (isLoggedIn) => !!isLoggedIn;  

export default checkAuthorization(authCondition)(AccountDetail);