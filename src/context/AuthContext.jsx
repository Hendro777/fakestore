import { createContext, useReducer, useState } from "react";
import { loginUser } from "../utils/auth";
import { getUserById } from "../utils/api";

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [userAuth, setUserAuth] = useState(null)
    const [user, setUser] = useState(null)

    console.log("AuthContext user:", user)

    const isAuthenticated = !!userAuth

    async function handleLogin(username, password) {
        try {
            const data = await loginUser(username, password);
            if(data.message) {
                throw data
            }
            setUserAuth(data)
            
            const userData = await getUserById(data.id)
            setUser(userData)
        } catch (err) {
            throw(err);
        }
    }

    async function handleLogout() {
        setUserAuth(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{userAuth, user, isAuthenticated, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}