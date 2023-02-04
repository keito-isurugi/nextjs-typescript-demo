// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKWTWVKWyNhfQ2wkhMyrfjMYMUJFjwk5c",
  authDomain: "firabase-tutorial-c95a1.firebaseapp.com",
  projectId: "firabase-tutorial-c95a1",
  storageBucket: "firabase-tutorial-c95a1.appspot.com",
  messagingSenderId: "727759336399",
  appId: "1:727759336399:web:bf1c6e60abca8540ead8ba"
};

// Initialize Firebase
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}
// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db