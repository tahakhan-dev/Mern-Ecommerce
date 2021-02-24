// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyACJC0P99uBwwANAwYKthL_pBzD6o8hEuI",
  authDomain: "mern-ecommerce-7ac45.firebaseapp.com",
  projectId: "mern-ecommerce-7ac45",
  storageBucket: "mern-ecommerce-7ac45.appspot.com",
  messagingSenderId: "198119099188",
  appId: "1:198119099188:web:27445abf03d71e13bbf361",
  measurementId: "G-19P0SDLRR9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// with firebase we get 'firebase auth function'
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
