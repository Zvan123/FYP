import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfcArWPZyhLOC7iBpdXEKXnb3DoYJM_4c",
    authDomain: "uop-fyp.firebaseapp.com",
    projectId: "uop-fyp",
    storageBucket: "uop-fyp.firebasestorage.app",
    messagingSenderId: "888733289800",
    appId: "1:888733289800:web:551a5551cc4dca00fdf77d",
    measurementId: "G-4GBKVE41YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);