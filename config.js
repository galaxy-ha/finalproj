import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
    authDomain: "kinetic-abbey-249018.firebaseapp.com",
    databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
    projectId: "kinetic-abbey-249018",
    storageBucket: "kinetic-abbey-249018.appspot.com",
    messagingSenderId: "529159690881",
    appId: "1:529159690881:web:f734628c7fd665b66c4b80"
  };
  const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();