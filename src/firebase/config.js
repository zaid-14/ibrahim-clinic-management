import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBODQrvAnJA58hNqItIkXkqJT4cqw5-HUM",
  authDomain: "ibrahim-clinic-management.firebaseapp.com",
  projectId: "ibrahim-clinic-management",
  storageBucket: "ibrahim-clinic-management.firebasestorage.app",
  messagingSenderId: "121763519494",
  appId: "1:121763519494:web:40a6402f1860fd92f37787"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);