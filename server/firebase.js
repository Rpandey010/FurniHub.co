const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBvKxi2XnnbDc8V8NaSMeFyiAc3jFpBEKo",
  authDomain: "furnihub-52977.firebaseapp.com",
  projectId: "furnihub-52977",
  storageBucket: "furnihub-52977.appspot.com",
  messagingSenderId: "719022156889",
  appId: "1:719022156889:web:d62dd324ccb99ccbedd548",
  measurementId: "G-91QP5YJH38"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth();

module.exports = { auth, app };