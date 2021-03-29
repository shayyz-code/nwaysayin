import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

/*const firebaseConfig = {
  apiKey: process.env.NWAYSAYIN_FIREBASE_APIKEY,
  authDomain: process.env.NWAYSAYIN_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NWAYSAYIN_FIREBASE_DATABASEURL,
  projectId: process.env.NWAYSAYIN_FIREBASE_PROJECTID,
  storageBucket: process.env.NWAYSAYIN_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NWAYSAYIN_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NWAYSAYIN_FIREBASE_APPID,
  measurementId: process.env.NWAYSAYIN_FIREBASE_MESUREMENTID,
};*/

var firebaseConfig = {
  apiKey: 'AIzaSyBAbxeLeUH6zEFHlY-yDoDuhUNubH_sHLM',
  authDomain: 'nway-6b6c4.firebaseapp.com',
  databaseURL: 'https://nway-6b6c4-default-rtdb.firebaseio.com',
  projectId: 'nway-6b6c4',
  storageBucket: 'nway-6b6c4.appspot.com',
  messagingSenderId: '649730563232',
  appId: '1:649730563232:web:bcf16f1ead89debeb73dc5',
  measurementId: 'G-S5GGFNWVJY',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();
export const firestore = firebase.firestore();
