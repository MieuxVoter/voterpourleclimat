import firebase from "./Firebase"

/**
 * Store vote in the database
 */
export const castVote = (votes, collectionName, uid) => {
  const voteDoc = firebase.firestore().collection(collectionName).doc(uid)
  return voteDoc.set(votes)
}

/*
 * Store info about the user in the database
 */
export const saveInfo = (infos, uid) => {
  return firebase.firestore().collection("user").doc(uid).set(infos)
}

/*
 * Store vote in the database
 */
export const loadVote = (collectionName, uid) => {
  return firebase.firestore().collection(collectionName).doc(uid).get()
}
