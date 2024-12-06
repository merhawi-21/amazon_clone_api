import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth' //use for auth
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2ya7UGd8v8qq0xvJEXe7ZM5XzgINTvNw",
  authDomain: "clone-20a21.firebaseapp.com",
  projectId: "clone-20a21",
  storageBucket: "clone-20a21.firebasestorage.app",
  messagingSenderId: "710242728234",
  appId: "1:710242728234:web:09a86d503f1cb8b9710653",
  measurementId: "G-DEXWQ5D3L9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = app.firestore()