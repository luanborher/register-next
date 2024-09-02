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
  uri: string,
  register_id: string,
  photo_name: string,
) => {
  try {
    const storageRef = ref(storage, `images/${register_id}/${photo_name}`);
    const blob = await uriToBlob(uri);
    await uploadBytes(storageRef, blob);
    const url = getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return '';
  }
};

export const uriToBlob = (uri: string): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
