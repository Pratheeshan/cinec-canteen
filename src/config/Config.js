// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw1LmHTKjRQhsUOHWNqMbogaDFI6r9-Os",
  authDomain: "cinec-canteen.firebaseapp.com",
  projectId: "cinec-canteen",
  storageBucket: "cinec-canteen.appspot.com",
  messagingSenderId: "121282562674",
  appId: "1:121282562674:web:6e9ae800600a7a2287d0eb",
  measurementId: "G-9CTRC78CRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);