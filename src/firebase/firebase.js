import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBuy5I4nqwj2PifTkMc-FZkFnjuKTAQNb0",
  authDomain: "rumbleon-auth.firebaseapp.com",
  databaseURL: "https://rumbleon-auth.firebaseio.com",
  projectId: "rumbleon-auth",
  storageBucket: "rumbleon-auth.appspot.com",
  messagingSenderId: "953789123507"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage().ref();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
  db,
  auth,
  storage,
  googleProvider,
  facebookProvider,
}