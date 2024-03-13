// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY_GOOGLE,
  authDomain:process.env.AUTO_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSANGERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
