import { Form, redirect, useActionData, useNavigate } from "react-router-dom"
import { loginUser } from "../utils/auth"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export async function loader() {
    return null
}

export default function Login() {
    const { user, handleLogin, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    if(isAuthenticated) {
        console.log("user", user)
        return navigate("/account")
    }

    async function handleSubmit(event) {
        const formData = new FormData(event.target)
 
        console.log("formdata", formData)

        try {
            const data = await handleLogin(formData.get("username"), formData.get("password"))
    
            if (data?.message) {
                // Error
                console.log("error", data)
                setError(data)
            } else {
                // Success
                console.log("success")
    
                const searchParams = new URL(window.location.href).searchParams
                const redirectTo = searchParams.get("redirectTo")
    
                return navigate(redirectTo || "/account")
            }
        } catch (err) {
            console.log("fehler", err)
            setError(err)
        }
    }

    return (
        <div className="vh-container login">
            <Form onSubmit={handleSubmit} className="loginForm">
                <h2 className="headline">Login</h2>
                {error && <div className="error">{error.message}</div>}
                <div className="inputs">
                    <label htmlFor="username">
                        Username
                        <input
                            type="text"
                            name="username"
                            placeholder="Username *" />
                    </label>

                    <label htmlFor="password">
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Password *" />
                    </label>
                </div>
                <button type="submit">
                    Log in
                </button>
            </Form>
        </div>
    )
}

