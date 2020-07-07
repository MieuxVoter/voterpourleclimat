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
  console.log(infos)
  const db = firebase.firestore()
  const batch = db.batch()

  batch.set(db.collection("userPub").doc(uid), {
    age: infos.age ? infos.age : "",
    gender: infos.gender ? infos.gender : "",
    zipCode: infos.zipCode ? infos.zipCode : "",
  })

  batch.set(db.collection("user").doc(uid), {
    name: infos.name ? infos.name : "",
    mail: infos.mail ? infos.mail : "",
    noConfirm: infos.noConfirm ? infos.noConfirm : false,
    canSendMail: infos.canSendMail ? infos.canSendMail : false,
    canDisplayName: infos.canDisplayName ? infos.canDisplayName : false,
  })

  return batch.commit()
}

/*
 * Load user
 */
export const loadUser = uid => {
  return firebase.firestore().collection("user").doc(uid)
}

/*
 * Load vote from the database
 */
export const loadVote = (collectionName, uid) => {
  return firebase.firestore().collection(collectionName).doc(uid).get()
}

/*
 * Update a document
 */
export const updateDocument = (infos, collectionName, documentName) => {
  return firebase
    .firestore()
    .collection(collectionName)
    .doc(documentName)
    .set(infos)
}
