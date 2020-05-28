import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLHLzLEYovQCqM6_tkNiDyIhitLmvDQ-o",
  authDomain: "spxeventos-lt.firebaseapp.com",
  databaseURL: "https://spxeventos-lt.firebaseio.com",
  projectId: "spxeventos-lt",
  storageBucket: "spxeventos-lt.appspot.com",
  messagingSenderId: "894502476229",
  appId: "1:894502476229:web:9c971daa9b950edfcf13ac",
  measurementId: "G-LYKDSST95Q",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
