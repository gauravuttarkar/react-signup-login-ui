import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: process.env.API_KEY,
  authDomain: "react-app-885e8.firebaseapp.com",
  databaseURL: "https://react-app-885e8.firebaseio.com",
  projectId: "react-app-885e8",
  storageBucket: "react-app-885e8.appspot.com",
  messagingSenderId: "807198065368",
  appId: "1:807198065368:web:d4e19729dbce53ebf98dad"
};
var fire = firebase.initializeApp(config);
export default fire;
