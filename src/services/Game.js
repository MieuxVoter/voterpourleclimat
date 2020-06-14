import React, {createContext, useContext, useState, useEffect} from 'react';
import firebase from './Firebase';
import { useSession } from './User'


export const useGameFromUser = user => {
  // retrieve the game for which the user is a player
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if(!user.gameId) {
      return () => {};
    }
    const unsubscribe = firebase
      .firestore()
      .collection('game')
      .doc(user.gameId)
      .onSnapshot(
        doc => {
          setGame(doc);
          setLoading(false);
        },
        err => setError(err),
      );

    return () => unsubscribe();
  }, [user]);

  return {
    error,
    loading,
    game
  };
};

export const gameContext = createContext({
  user: null,
});

export const GameProvider = props => {
  const {user} = useSession();
  const {error, loading, game} = useGameFromUser(user);

  if (error) {
    return <div>Erreur... {error}</div>;
  }
  if (loading) {
    return <div>Chargement du master game en cours...</div>;
  }

  const {children} = props;
  return (
    <gameContext.Provider value={{game}}>
      {children}
    </gameContext.Provider>
  );
};

export const useGame = () => {
  const {game} = useContext(gameContext);
  return {game};
};
