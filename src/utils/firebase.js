import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQFmIKPKdJSwvCFErC9pnL5MreKKByTjo",
    authDomain: "shopping-mall-ca178.firebaseapp.com",
    projectId: "shopping-mall-ca178",
    storageBucket: "shopping-mall-ca178.appspot.com",
    messagingSenderId: "966381390815",
    appId: "1:966381390815:web:b5a8d3add5b772d766526a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const usersCollection = db.collection('users')
const productsCollection = db.collection('produc')
const storage = firebase.storage
const storageRef = firebase.storage().ref()

export {
    auth,
    db,
    usersCollection,
    productsCollection,
    storage,
    storageRef,
}
