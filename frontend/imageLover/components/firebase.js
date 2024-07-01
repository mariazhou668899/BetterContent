// firebaseConfig.js
import { initializeApp, getApp  } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmmEdZo3_YduE0VxPj-UdSoW5huNhb4hY",
    authDomain: "loveimage-37a10.firebaseapp.com",
    projectId: "loveimage-37a10",
    storageBucket: "loveimage-37a10.appspot.com",
    messagingSenderId: "130988584052",
    appId: "1:130988584052:web:98e7835bb6d71ea914b521"
};

const app = initializeApp(firebaseConfig);

// Initialize firestore
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  export { app, auth, getApp, getAuth, db};