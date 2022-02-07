import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const FirebaseContext = createContext();

export function FirebaseContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState("");

  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const projectsCollectionRef = collection(db, "projects");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getProject = async (uid) => {
      if (uid !== "") {
        // Projects
        const qProjects = await query(
          projectsCollectionRef,
          where("uid", "==", uid)
        );
        const querySnapshotProjects = await getDocs(qProjects);
        const projects = querySnapshotProjects.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("🏡 projects :");
        console.table(projects);
        await setProjects(projects);
        // Username
        const qUsername = await query(
          usersCollectionRef,
          where("uid", "==", uid)
        );
        const querySnapshotUsername = await getDocs(qUsername);
        const username = querySnapshotUsername.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("👤 username :", username[0].username);
        await setUsername(username[0].username);
        // }
      } else {
        setProjects([]);
        setUsername("");
      }
    };
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user !== currentUser) {
        console.log("🔁 user changed");
        console.log(
          user !== null ? "✅ user is connected" : "❌ user is disconnected"
        );
        setUid(user !== null ? user.uid : "");
        await getProject(user !== null ? user.uid : "");
      }
    });
    return unsubscribe;
  }, [uid, currentUser, projectsCollectionRef, usersCollectionRef]);

  return (
    <FirebaseContext.Provider
      value={{ currentUser, username, uid, projects, signIn }}
    >
      {!loading && props.children}
    </FirebaseContext.Provider>
  );
}
