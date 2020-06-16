import firebase from "./Firebase"
import { useUser, useAuth } from "./User"

/**
 * Store vote in the database
 */
export const castVote = (votes, collectionName, uid) => {
  console.log(collectionName, uid, votes)
  const voteDoc = firebase.firestore().collection(collectionName).doc(uid)
  const map = {}
  for (const vote of votes) {
    map[vote.proposal] = vote.vote
  }
  voteDoc.set(map)
}

/*
 * Store info about the user in the database
 */
export const saveInfo = (infos, uid) => {
  firebase.firestore().collection("user").doc(uid).set(infos)
}

/*
 * Store vote in the database
 */
export const loadVote = (collectionName, uid) => {
  return firebase.firestore().collection(collectionName).doc(uid).get()
}
