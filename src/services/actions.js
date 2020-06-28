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
export const updateUser = (infos, uid) => {
  const model = {
    name: infos.name ? infos.name : "",
    mail: infos.mail ? infos.mail : "",
    age: infos.age ? infos.age : "",
    zipCode: infos.zipCode ? infos.zipCode : "",
    noConfirm: infos.noConfirm ? infos.noConfirm : false,
    canSendMail: infos.canSendMail ? infos.canSendMail : false,
    canDisplayName: infos.canDisplayName ? infos.canDisplayName : false,
  }
  return firebase.firestore().collection("user").doc(uid).set(model)
}

/*
 * Store vote in the database
 */
export const loadVote = (collectionName, uid) => {
  return firebase.firestore().collection(collectionName).doc(uid).get()
}
