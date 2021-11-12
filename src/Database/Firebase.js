import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDVRXHMP1YBStzaQK4O4haCUxpWr7gC2OA',
  authDomain: 'yocket-5ff9b.firebaseapp.com',
  projectId: 'yocket-5ff9b',
  storageBucket: 'yocket-5ff9b.appspot.com',
  messagingSenderId: '700260538535',
  appId: '1:700260538535:web:bcbfaa3ca02e6e34902382',
  measurementId: 'G-ZG3LMFB7MR',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()
var storageRef = firebase.storage().ref()

export { auth, db, storageRef }
