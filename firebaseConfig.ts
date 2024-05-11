import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwqnXLBEoky6rEnpfB0RRHiQjWhC6J6es",
  authDomain: "todo-app-rn-a8ea3.firebaseapp.com",
  projectId: "todo-app-rn-a8ea3",
  storageBucket: "todo-app-rn-a8ea3.appspot.com",
  messagingSenderId: "328608640116",
  appId: "1:328608640116:web:f3600a13c2a1a70f4ef521"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);