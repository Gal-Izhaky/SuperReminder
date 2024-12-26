import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain:  "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get };
