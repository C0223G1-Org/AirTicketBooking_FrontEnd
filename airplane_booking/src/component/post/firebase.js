

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "@firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDe_vwUnM0kqZEzKswGqtOLx_PFFUKarbI",
    authDomain: "airplan-97803.firebaseapp.com",
    projectId: "airplan-97803",
    storageBucket: "airplan-97803.appspot.com",
    messagingSenderId: "280855375751",
    appId: "1:280855375751:web:6654bf3cf51dd3fd19ad22",
    measurementId: "G-703T412JXQ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)