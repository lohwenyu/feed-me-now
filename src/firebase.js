import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCS-IPg6leIzJAsNilhB9zjnYs17R4LMmg",
    authDomain: "bt3103-feed-me-now.firebaseapp.com",
    projectId: "bt3103-feed-me-now",
    storageBucket: "bt3103-feed-me-now.appspot.com",
    messagingSenderId: "1042117429489",
    appId: "1:1042117429489:web:3f8acba267680f6e238150",
    measurementId: "G-704VTEHLQH"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
var auth = firebase.auth();

export { database as default,  auth};