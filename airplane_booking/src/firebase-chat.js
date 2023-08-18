import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  ref,
  push,
  onValue,
  off,
  get,
  child,
  set,
  orderByChild,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAKxixneH-0xLabU31kS1dLQvBPr4_NsBk",
  authDomain: "chat-messenger-air.firebaseapp.com",
  databaseURL: "https://chat-messenger-air-default-rtdb.firebaseio.com",
  projectId: "chat-messenger-air",
  storageBucket: "chat-messenger-air.appspot.com",
  messagingSenderId: "196746001133",
  appId: "1:196746001133:web:0a2c1bf5efbbfb5d96aae4",
  measurementId: "G-G99HKSQPGX",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, ref, push, onValue, off, get, child, set, orderByChild };
export const storage = getStorage(app);
