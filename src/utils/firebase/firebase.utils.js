import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBvzvfgUk9eAMXlsGzhG7M-r8VhUBoSy_4",
    authDomain: "croen-clothing-db.firebaseapp.com",
    projectId: "croen-clothing-db",
    storageBucket: "croen-clothing-db.appspot.com",
    messagingSenderId: "934799454501",
    appId: "1:934799454501:web:56afbfa7a4424f16022acc"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.getCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db,'users',userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt
              });
          } catch (error) {
              console.log('error creating user', error.message);
          }
      }

      return userDocRef;
  };