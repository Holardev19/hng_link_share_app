// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Ensure this import exists
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBKZJTgUJwLMQwV9nUte0-tyzHVRQAdv6M",
	authDomain: "hng-link-sharing-app.firebaseapp.com",
	projectId: "hng-link-sharing-app",
	storageBucket: "hng-link-sharing-app.appspot.com",
	messagingSenderId: "1024251048706",
	appId: "1:1024251048706:web:24cec3041c89452a5e881b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
