import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC0hL9DE5B9sEF_WMzUIPCq7ybhp9kBBI0",
    authDomain: "phonebook-6ade9.firebaseapp.com",
    databaseURL: "https://phonebook-6ade9.firebaseio.com",
    projectId: "phonebook-6ade9",
    storageBucket: "phonebook-6ade9.appspot.com",
    messagingSenderId: "789118727913",
    appId: "1:789118727913:web:098fbdd6c3df896e032278",
    measurementId: "G-F15MCDT1S7"
}
firebase.initializeApp(config);
firebase.analytics();

export default firebase;