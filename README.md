Add file "firebaseConfig.ts" to the root of the project for the application to work.
----
firebaseConsif.ts:
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```
