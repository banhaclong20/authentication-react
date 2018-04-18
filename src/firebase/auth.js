import { auth, googleProvider, facebookProvider } from './firebase';

// Sign In
export const signInWithEmailPassword = (email, password) => 
  auth.signInWithEmailAndPassword(email, password);

// Sign up
export const createUserWithEmailPassword = (email, password) => 
  auth.createUserWithEmailAndPassword(email, password);

// Sign Out
export const SignOut = () => 
  auth.signOut();

// Password Reset
export const passwordReset = (email) => 
  auth.sendPasswordResetEmail(email);

// Password Change 
export const passwordUpdate = (password) => 
  auth.currentUser.updatePassword(password);

export const loginWithGoogle = () =>
  auth.signInWithPopup(googleProvider);

export const loginWithFacebook = () =>
  auth.signInWithPopup(facebookProvider);