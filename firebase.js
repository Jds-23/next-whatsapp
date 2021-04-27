import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAkF97V1TaOtL2HUXCWlh3dllF92gz9TLM",
    authDomain: "teamify-15fba.firebaseapp.com",
    projectId: "teamify-15fba",
    storageBucket: "teamify-15fba.appspot.com",
    messagingSenderId: "17276876828",
    appId: "1:17276876828:web:db3a1da5bfb5e782eb87d9"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, provider };