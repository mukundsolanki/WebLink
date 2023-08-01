// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBstjH16rZflcCMJs7aWiB6KZlRxrk2dno",
  authDomain: "weblink-525a5.firebaseapp.com",
  projectId: "weblink-525a5",
  storageBucket: "weblink-525a5.appspot.com",
  messagingSenderId: "47939641178",
  appId: "1:47939641178:web:fd87427939c86b582a9d63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();