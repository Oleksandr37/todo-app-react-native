import { action, makeAutoObservable, observable } from "mobx";
import { app } from "../../firebaseConfig";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserStoreType } from "../types/UserStoreType";
import { handleError } from "../helpers/handleError";

export class UserStore implements UserStoreType {
  user: User | null;

  constructor() {
    const auth = getAuth(app);
    this.user = auth.currentUser;
    makeAutoObservable(this);
  }
  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.user = null;
      })
      .catch((error) => {
        handleError(error);
      });
  }
  logInUser(
    email: string,
    password: string,
    succesfulyLogedIn: () => void,
    finallyCallback: () => void,
  ) {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        succesfulyLogedIn();
      })
      .catch((error) => handleError(error))
      .finally(() => {
        finallyCallback();
      });
  }
  registerUser(
    email: string,
    password: string,
    succesfulyRegistered: () => void,
    finallyCallback: () => void,
  ) {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        succesfulyRegistered();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        finallyCallback();
      });
  }
}
