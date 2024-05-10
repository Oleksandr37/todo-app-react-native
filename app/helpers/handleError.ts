import { Alert } from "react-native";

export const handleError = (error: any) => {
    console.log(error.code);
    let message = "";
    switch (error.code) {
        case "auth/email-already-in-use":
            message = "Email is already in use";
            break;
        case "auth/invalid-email":
            message = "Email is invalid";
            break;
        case "auth/invalid-credential":
            message = "Invalid credentials";
            break;
        case "auth/weak-password":
            message = "Password is too weak";
            break;
        case "auth/user-not-found":
            message = "User not found";
            break;
        case "auth/wrong-password":
            message = "Wrong password";
            break;
        case "auth/too-many-requests":
            message = "Too many requests, try again later";
            break;
        default:
            message = "Something went wrong";
            break;
    }
    Alert.alert("Error", message);
}