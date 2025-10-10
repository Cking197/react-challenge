// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { useCallback, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
// import { getDatabase, onValue, push, ref, update } from 'firebase/database';
import { getDatabase, onValue, ref,update } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
//const analytics = getAnalytics(firebase);



export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};

// uid is the user ID
// postData is an object with the post's content, timestamp, title, etc.
// Get an ID for the post
export const updateCourse=async(courseID:string, postData:object): Promise<void> => {
  const toUpdate = ref(database, 'courses/' + courseID);
  await update(toUpdate, postData);
};