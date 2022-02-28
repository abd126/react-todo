import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9gdzNPYB_cOVZJPry2438-PKI6U_81Ug",
    authDomain: "react-todo-b38c0.firebaseapp.com",
    projectId: "react-todo-b38c0",
    storageBucket: "react-todo-b38c0.appspot.com",
    messagingSenderId: "644240134370",
    appId: "1:644240134370:web:0fbf1cbe08cbfd30234ebb",
    measurementId: "G-MK3HN70GG7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore()

  export {db}