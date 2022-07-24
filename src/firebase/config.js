import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE = process.env.REACT_APP_STORAGE;
const MESSAGING = process.env.REACT_APP_MESSAGING;
const APP_ID = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE,
    messagingSenderId: MESSAGING,
    appId: APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };