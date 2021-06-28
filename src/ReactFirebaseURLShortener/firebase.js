import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAhv4ysmzxKfs3D0lBDfR3SGzq2pzgQpSE",
  authDomain: "react-firebase-url-shorten.firebaseapp.com",
  projectId: "react-firebase-url-shorten",
  storageBucket: "react-firebase-url-shorten.appspot.com",
  messagingSenderId: "917979020070",
  appId: "1:917979020070:web:17b2b1eeea4f5741575fe7",
  measurementId: "G-R802N8ZF6S"
})
const firestore = app.firestore()
export const database = {
  urlDetails: firestore.collection('urlDetails'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}

export default app