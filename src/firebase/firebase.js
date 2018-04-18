import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBuy5I4nqwj2PifTkMc-FZkFnjuKTAQNb0",
  authDomain: "rumbleon-auth.firebaseapp.com",
  databaseURL: "https://rumbleon-auth.firebaseio.com",
  projectId: "rumbleon-auth",
  storageBucket: "",
  messagingSenderId: "953789123507"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
  db,
  auth,
  googleProvider,
  facebookProvider,
}