import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics'; // Optional: Add Firebase analytics if needed
import 'firebase/compat/storage'; // Corrected import for storage

const firebaseConfig = {
  apiKey: "AIzaSyBvKxi2XnnbDc8V8NaSMeFyiAc3jFpBEKo",
  authDomain: "furnihub-52977.firebaseapp.com",
  projectId: "furnihub-52977",
  storageBucket: "furnihub-52977.appspot.com",
  messagingSenderId: "719022156889",
  appId: "1:719022156889:web:d62dd324ccb99ccbedd548",
  measurementId: "G-91QP5YJH38"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

export { firebase, storage };
