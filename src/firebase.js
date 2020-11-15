import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAvqS2i3FrygSBVcZbpZ1HUUNXCEdRY3DQ",
    authDomain: "whatsapp-clone-15cf9.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-15cf9.firebaseio.com",
    projectId: "whatsapp-clone-15cf9",
    storageBucket: "whatsapp-clone-15cf9.appspot.com",
    messagingSenderId: "148033301488",
    appId: "1:148033301488:web:e77b42723fe325c48dcb35",
    measurementId: "G-RFQT3QCQL6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;