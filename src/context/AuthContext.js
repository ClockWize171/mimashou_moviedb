import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
 } from 'firebase/auth'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const values = { signUp, signIn}

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}