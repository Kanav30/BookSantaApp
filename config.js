import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC56-0JCjUgQMmDn80ccvxFjsi4wGuL50E",
    authDomain: "book-santa-bcc49.firebaseapp.com",
    databaseURL: "https://book-santa-bcc49.firebaseio.com",
    projectId: "book-santa-bcc49",
    storageBucket: "book-santa-bcc49.appspot.com",
    messagingSenderId: "634782817463",
    appId: "1:634782817463:web:2d8bc1a7430ff18140c132"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();