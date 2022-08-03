// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiy3MUx-YJZNYEpEV7jABfMaJrgKPpIUg",
  authDomain: "fire-chat-app-fc5c8.firebaseapp.com",
  projectId: "fire-chat-app-fc5c8",
  storageBucket: "fire-chat-app-fc5c8.appspot.com",
  messagingSenderId: "214479623772",
  appId: "1:214479623772:web:1289d88b87d2125b0b7899",
  databaseURL: "https://fire-chat-app-fc5c8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
