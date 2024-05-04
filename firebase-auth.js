import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import app from './firebase-config'


const auth = getAuth(app);

// Handle sign up new users

export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        console.log("User created: ", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Signup error: ", error.message);
        throw error;
    }
};


// Handle log in existing users

export const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in: ", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Login error: ", error.message);
        throw error;
    }
};


// Handle log out

export const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Logout error: ", error.message);
        throw error;
    }
};