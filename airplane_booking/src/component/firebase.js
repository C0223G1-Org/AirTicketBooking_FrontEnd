
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
    apiKey: "AIzaSyA-czwPu_yHDbzWRTO4Cqi9uCUtMQaATgQ",
    authDomain: "air-plan-71182.firebaseapp.com",
    projectId: "air-plan-71182",
    storageBucket: "air-plan-71182.appspot.com",
    messagingSenderId: "477559743083",
    appId: "1:477559743083:web:78b66edc86932b63d2872e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)