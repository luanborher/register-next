// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuioMt21C_y4iTzjCYd7xAihKR66Y66RI',
  authDomain: 'registerapp-424d7.firebaseapp.com',
  projectId: 'registerapp-424d7',
  storageBucket: 'registerapp-424d7.appspot.com',
  messagingSenderId: '617283183833',
  appId: '1:617283183833:web:5c2a7a22a228e429ec0ac8',
  measurementId: 'G-SFT2KNFDQS',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firestore = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export const uploadPhoto = async (
  file: File,
  register_id: string,
  photo_name: string,
) => {
  try {
    const storageRef = ref(storage, `images/second_document/${photo_name}`);
    await uploadBytes(storageRef, file);
    const url = getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Upload failed: ', error);
    return '';
  }
};
