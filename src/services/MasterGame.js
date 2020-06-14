import React, {createContext, useContext, useState, useEffect} from 'react';
import firebase from './Firebase';
import {useSession} from './User';


const generateCode = () => {
    const random = Math.abs(Math.floor((Math.sin(Date.now()) * 1000)));
    return random;
}

export const createGame = user => {
  return firebase
    .firestore()
    .collection('game')
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      master: user.uid,
      code: generateCode()
    });
};

export const addPlayer = (name, game) => {
  const players = game.players || [];
  firebase
    .firestore()
    .collection('game')
    .doc(game.id)
    .set({...game, players: [...players, {name}]});
};

export const masterGameContext = createContext({
  user: null,
});

export const useMasterGameFromUser = user => {
  // retrieve the game for which the user is the master game
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('game')
      .where('master', '==', user.uid)
      .onSnapshot(
        querySnapshot => {
          let found = false;
          querySnapshot.forEach(doc => {
            if (found)
              throw new Error('Multiple games were found for the same user.');
            found = true;
            setGame({...doc.data(), id: doc.id});

            setLoading(false);
          });
        },
        err => setError(err),
      );

    return () => unsubscribe();
  }, [user]);

  return {
    error,
    loading,
    game,
  };
};

export const MasterGameProvider = props => {
  const {user} = useSession();
  const {error, loading, game} = useMasterGameFromUser(user);

  if (error) {
    return <div>Erreur... {error}</div>;
  }
  if (loading) {
    return <div>Chargement du master game en cours...</div>;
  }

  const {children} = props;
  return (
    <masterGameContext.Provider value={{game}}>
      {children}
    </masterGameContext.Provider>
  );
};

export const useMasterGame = () => {
  const {game} = useContext(masterGameContext);
  return {game};
};
