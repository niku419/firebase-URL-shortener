import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyC9R36nmNBEux_qCR3v2fjOWKhEXe7zkhk",
  authDomain: "ulr-shortener-e0b28.firebaseapp.com",
  projectId: "ulr-shortener-e0b28",
  storageBucket: "ulr-shortener-e0b28.appspot.com",
  messagingSenderId: "446250266446",
  appId: "1:446250266446:web:cf9ef8623cfa749d6bb81f",
  measurementId: "G-SK9847WQV2"
})
const firestore = app.firestore()
export const database = {
  urlDetails: firestore.collection('urlDetails'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}

export default app