
// nootrino
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from '@firebase/firestore';
//import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

  apiKey: "AIzaSyBaT-mtiRqn2QmUqHz9Z-O1MC8joOIV0_g",
  authDomain: "nootrino-13e7c.firebaseapp.com",
  projectId: "nootrino-13e7c",
  storageBucket: "nootrino-13e7c.appspot.com",
  messagingSenderId: "200932951269",
  appId: "1:200932951269:web:a28795976bd63ccea1c00c",
  measurementId: "G-QJGY8E108K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
//export const auth = getAuth(app);
//const analytics = getAnalytics(app);

/*
//nootrino 2
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKETqjs6G0HPb4cX32TlooOomj_eg1lAM",
  authDomain: "nootrino2.firebaseapp.com",
  projectId: "nootrino2",
  storageBucket: "nootrino2.appspot.com",
  messagingSenderId: "941572701373",
  appId: "1:941572701373:web:4ef420776084d95b0e0bd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/