// Import the functions you need from the SDKs you need
import firebase from "firebase"
import "firebase/storage"
import "firebase/messaging"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8UIY1QarJkM_qHpsRHolDqroXLuxWgRs",
  authDomain: "iqbenchmark-32763.firebaseapp.com",
  databaseURL: "https://iqbenchmark-32763-default-rtdb.firebaseio.com",
  projectId: "iqbenchmark-32763",
  storageBucket: "iqbenchmark-32763.appspot.com",
  messagingSenderId: "639681046258",
  appId: "1:639681046258:web:8b043ab1c4f47d9f79526b",
  measurementId: "G-0CM31JGVG7",
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}
// if (window.location.hostname === "localhost") {
//   firebase.auth().useEmulator("http://localhost:9099")
//   firebase.firestore().useEmulator("localhost", 8081)
//   firebase.firestore().settings({
//     experimentalForceLongPolling: true,
//     merge: true,
//   })
//   firebase.functions().useEmulator("localhost", 5001)
//   firebase.database().useEmulator("localhost", 9000)
//   firebase.storage().useEmulator("localhost", 9199)
// }
let messaging: any

try {
  messaging = firebase.messaging()
} catch (error) {
  console.log(error)
}

export const getToken = () => {
  if (!messaging) return
  return messaging
    .getToken({
      vapidKey:
        "BPkF1GbiWDkta2-nPnOz1NuwTMWWJ7-RB187ZLcOmPOUGsLua4AsJCjmlrpIMGK3m_r2PZEAwWkf-n6GDO-qh7o",
    })
    .then((currentToken: any) => {
      if (currentToken) {
        return currentToken
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        return undefined
        // shows on the UI that permission is required
      }
    })
    .catch((err: any) => {
      console.log("An error occurred while retrieving token. ", err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging &&
      messaging.onMessage((payload: any) => {
        resolve(payload)
      })
  })

export default firebase
