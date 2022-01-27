import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const FirebaseContext = createContext();

export function FirebaseContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseContext.Provider value={{ currentUser, signIn }}>
      {!loading && props.children}
    </FirebaseContext.Provider>
  );
}
