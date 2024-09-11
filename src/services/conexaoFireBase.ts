import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvKg5ZNmh9g3_DJ16gX3AlUeLbjntngno",
  authDomain: "ms-car-bfeed.firebaseapp.com",
  projectId: "ms-car-bfeed",
  storageBucket: "ms-car-bfeed.appspot.com",
  messagingSenderId: "773560812870",
  appId: "1:773560812870:web:959d08ebacd5a0ed8e5147"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}