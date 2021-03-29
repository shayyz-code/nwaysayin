import { useEffect, useState, createContext } from 'react';
import { firestore, firebaseAuth } from '../firebase/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user !== null) {
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then(snapshot => {
            setCurrentUser({
              ...user,
              displayName: snapshot.data().username,
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else if (user === null) {
        setCurrentUser(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
