// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVbKef-_emRztEIi2TQHUTsQfw255DrY",
  authDomain: "devfinder-2e6dd.firebaseapp.com",
  projectId: "devfinder-2e6dd",
  storageBucket: "devfinder-2e6dd.appspot.com",
  messagingSenderId: "641622641418",
  appId: "1:641622641418:web:fa05fb5017ffa36e0d88f3",
  measurementId: "G-VNDN8792QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage =  getStorage(app);

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db  = firebaseApp.firestore();

export { db, firebaseApp, analytics, storage};