import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.APP_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN_FIREBASE,
  projectId: process.env.PROJECT_ID_FIREBASE,
  storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.APP_ID_FIREBASE,
  measurementId: process.env.MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
