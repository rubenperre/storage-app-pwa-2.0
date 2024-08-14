// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMOd2RlyAP6k7qJ-ehoXsuZU06S1GNj7Q',
  authDomain: 'storage-app-e5078.firebaseapp.com',
  projectId: 'storage-app-e5078',
  storageBucket: 'storage-app-e5078.appspot.com',
  messagingSenderId: '699424949044',
  appId: '1:699424949044:web:5420c6b4e5f0be0b81db61',
  measurementId: 'G-TR9RC6Y7HE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, analytics, storage, db };
