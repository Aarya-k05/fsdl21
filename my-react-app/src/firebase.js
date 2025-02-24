import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkmgm3CIKZ9TLN37npirblu1oDgHk1O8Q",
  authDomain: "reactchatapp-4a1f5.firebaseapp.com",
  projectId: "reactchatapp-4a1f5",
  storageBucket: "reactchatapp-4a1f5.appspot.com",
  messagingSenderId: "400187102543",
  appId: "1:400187102543:web:4d513c493ae00476b3a13a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
