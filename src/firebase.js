// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_HZGi1j_VY71qswEboo7JemXgtXBOPHg",
  authDomain: "openskill-a3b95.firebaseapp.com",
  projectId: "openskill-a3b95",
  storageBucket: "openskill-a3b95.appspot.com",
  messagingSenderId: "149133357029",
  appId: "1:149133357029:web:1e44a5974c3b4c3807890c",
  measurementId: "G-CB0H00FHRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);