import { User } from "firebase/auth";

export type UserStoreType = {
  user: User | null;
  signOutUser: () => void;
  logInUser: (
    email: string,
    password: string,
    succesfulyLogedIn: () => void,
    finallyCallback: () => void,
  ) => void;
  registerUser: (
    email: string,
    password: string,
    succesfulyRegistered: () => void,
    finallyCallback: () => void,
  ) => void;
};
