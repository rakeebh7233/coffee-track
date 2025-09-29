import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext, use } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;
    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetEmail(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function logout() {
        setUser(null)
        setGlobalData(null)
        return signOut(auth);
    }

    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // If there's no user, empty the user state and return from this listener
            if (!user) { return }
            // if there is a user, then check if the user has date in the database, and if they do, then fetch said data and update the global state

            try {
                setIsLoading(true)

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)
            } catch (error) {
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

