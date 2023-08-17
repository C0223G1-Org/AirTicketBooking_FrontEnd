// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyASqUeIEx-0WfhMcvg5fj8yaWKCIGWGC0U",
 authDomain: "airticketbooking-5f805.firebaseapp.com",
 projectId: "airticketbooking-5f805",
 storageBucket: "airticketbooking-5f805.appspot.com",
 messagingSenderId: "518905343866",
 appId: "1:518905343866:web:82fc0a2f5769593b01f0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);