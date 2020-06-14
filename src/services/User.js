import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from './Firebase';

const connect = () => {
 firebase.auth().signInAnonymously().catch(error => {
   console.log("Error with anonymous connexion", error.code);
   console.log(error.message);
 });
}

export const userContext = createContext({
  user: null
});

export const useSession = () => {
  const { user } = useContext(userContext);
  return  { user };
}

export const useUser = () => {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (auth.loading) {
      return () => {};
    }

    const doc = firebase
      .firestore()
      .collection('user')
      .doc(auth.user.uid);
    if(!doc.exists) {
      doc.set({uid: auth.user.uid})
    }
    const unsubscribe = doc
      .onSnapshot(
        doc => {
          setUser({...doc, ...auth.user});
          setLoading(false);
        },
        err => setError(err),
      );

    return () => unsubscribe();
  }, [auth]);


  return {
    error,
    loading,
    user
  };
};

export const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;
    if (!user) {
      connect();
    }
    return {
      loading: !user,
      user
    };
  })

  const onChange = (user) => {
    if  (user) {
      setState({ loading: false, user })
    } else {
    }
    
  }

  useEffect( () => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe()
  }, []);

  return state;
}

export const UserProvider = (props) => {
  const { loading, user } = useUser();

  if (loading) {
    return (<div>Chargement...</div>);
  }

  const { children } = props;
  return (
    <userContext.Provider value={{user}}>
      {children}
    </userContext.Provider>
  );
}
