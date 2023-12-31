import { redirect } from "react-router-dom"
import { checkResponseForError } from "./api"

export async function requireAuth(request) {
    if (!(await isAuthenticated())) {
        const loginMessage = "You must log in first."
        const pathname = new URL(request.url).pathname

        const response = redirect(`/login?message=${loginMessage}&redirectTo=${pathname}`)
        throw response
    }

    return null
}

export async function loginUser(username, password) {
    const apiEndpoint = 'https://dummyjson.com/auth/login'
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            // expiresInMins: 60, // optional
        })
    })
    // checkResponseForError(response)
    const data = response.json()

    return data
}

export async function logoutUser() {
    localStorage.removeItem("currentUser")
}

export function isAuthenticated() {
    return JSON.parse(localStorage.getItem("currentUser")) !== null
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"))
}