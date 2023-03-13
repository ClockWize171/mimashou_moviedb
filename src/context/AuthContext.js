import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function signUp(email, password) {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 3000);
        createUserWithEmailAndPassword(auth, email, password)
            .then(
                setDoc(doc(db, 'users', email), {
                    favorite_shows: [],
                    watchlater_shows: []
                })
            )
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            })
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        console.log(provider)
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                setDoc(doc(db, 'users', user.email), {
                    favorite_shows: [],
                    watchlater_shows: []
                });
            })
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return (() => {
            unsubscribe();
        })
    }, [])


    const values = { signUp, signIn, user, error, logOut, signInWithGoogle, loading }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}