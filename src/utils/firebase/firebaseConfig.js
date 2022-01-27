// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbMFAq2pdMmol8QpSPeIU28onRSWe9ccc",
    authDomain: "react-gdrive-api.firebaseapp.com",
    projectId: "react-gdrive-api",
    storageBucket: "react-gdrive-api.appspot.com",
    messagingSenderId: "424492673114",
    appId: "1:424492673114:web:885582a17b62431fa65063",
    measurementId: "G-5D497K5HXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
