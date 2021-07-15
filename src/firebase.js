import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBxGDr40OZLo1QH-tJdlmwTad9ev4q8XZU",
  authDomain: "data-entry-aebb3.firebaseapp.com",
  projectId: "data-entry-aebb3",
  storageBucket: "data-entry-aebb3.appspot.com",
  messagingSenderId: "371384698495",
  appId: "1:371384698495:web:551a1f3c0f0dec2799214a",
  measurementId: "G-NEB1XYJ8E0"
});

export const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,storage,provider};
