import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, initializeUser);
    });

    async function initializeUser(user) {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();
            setRole(userData.role);
            setUser(user);
            setUserLoggedIn(true);
        } else {
            setUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = { user, loading, role, userLoggedIn };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
