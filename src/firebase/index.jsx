import firebase from "firebase/app";
import 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyDmhR71WzM2FGiULAvMi_dhugNWAJrYIMI",
    authDomain: "persuratan-93ace.firebaseapp.com",
    databaseURL: "https://persuratan-93ace.firebaseio.com",
    projectId: "persuratan-93ace",
    storageBucket: "persuratan-93ace.appspot.com",
    messagingSenderId: "261012112616",
    appId: "1:261012112616:web:4d987b7f4337d10563755d",
    measurementId: "G-C1VE27QPN0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;