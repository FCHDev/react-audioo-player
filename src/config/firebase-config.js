// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const configInfos = {
    apiKey: process.env.REACT_APP_CLE_API,
    authDomain: "audio-player-7611b.firebaseapp.com",
    projectId: "audio-player-7611b",
    storageBucket: "audio-player-7611b.appspot.com",
    messagingSenderId: "716788252531",
    appId: "1:716788252531:web:b36d02009dbafb19e78f06",
    databaseURL:
        "https://audio-player-7611b-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
export const appFirebase = initializeApp(configInfos);
export const db = getDatabase(appFirebase);
export const storage = getStorage(appFirebase);
export const refDb = (a, b) => {
    return ref(a, b);
};