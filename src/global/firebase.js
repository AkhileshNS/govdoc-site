import app from 'firebase/app';
import 'firebase/auth';

app.initializeApp({
  apiKey: "AIzaSyC2xFZGoue4Hhv79TNfd8aPLuerr6iT55c",
  authDomain: "shoppinglistplusplus-nsa.firebaseapp.com",
  databaseURL: "https://shoppinglistplusplus-nsa.firebaseio.com",
  projectId: "shoppinglistplusplus-nsa",
  storageBucket: "shoppinglistplusplus-nsa.appspot.com",
  messagingSenderId: "845516663781",
  appId: "1:845516663781:web:40c8566e50a25f19451d0c"
});
export default app;