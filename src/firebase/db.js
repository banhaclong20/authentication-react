import { db } from './firebase';

// Users API
export const createUser = (id, userType, first_name, last_name, email, phone_number, zip_code) => 
  db.ref(`users/${id}`).set({
    userType,
    first_name,
    last_name,
    email,
    phone_number,
    zip_code
  });

// Sell Page 
export const submitBike = (bikeId, uid, user, make, model, model_type, year, price, vin, mileage, color, loan, bank_name, loan_balance, physical_condition_str, mechanical_condition_str, tire_condition_str, accessories, services, more_info) => 
  db.ref(`bikes/${bikeId}`).set({
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
    more_info
  });  

export const onceGetUsers = () =>
  db.ref('users').once('value');