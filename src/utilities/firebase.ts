// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { useCallback, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
// import { getDatabase, onValue, push, ref, update } from 'firebase/database';
import { getDatabase, onValue, ref } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVfoFciYyLeiqG_82jIHhbBbwlqvOUqpM",
  authDomain: "react-challenge-e8ba3.firebaseapp.com",
  databaseURL: "https://react-challenge-e8ba3-default-rtdb.firebaseio.com",
  projectId: "react-challenge-e8ba3",
  storageBucket: "react-challenge-e8ba3.firebasestorage.app",
  messagingSenderId: "320571133707",
  appId: "1:320571133707:web:3228fcd9e56cfd74ecdc0e",
  measurementId: "G-55NSQ6LFQT"
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