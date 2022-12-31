import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCBUIIRI5nCSZBr3tUXAba4QstA3l7NUZU",
    authDomain: "first-nextjs-firebase.firebaseapp.com",
    projectId: "first-nextjs-firebase",
    storageBucket: "first-nextjs-firebase.appspot.com",
    messagingSenderId: "453230933629",
    appId: "1:453230933629:web:df14b08a3a850d87a9a314"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider()