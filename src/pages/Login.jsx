import { Form, redirect, useActionData, useLoaderData } from "react-router-dom"
import { isAuthenticated, loginUser } from "../utils/auth"

export async function action({ request }) {
    const formData = await request.formData()


    try {
        const data = await loginUser(formData.get("username"), formData.get("password"))

        if (data.message) {
            // Error
            return data
        } else {
            // Success
            localStorage.setItem("currentUser", JSON.stringify(data))

            const searchParams = new URL(request.url).searchParams
            const redirectTo = searchParams.get("redirectTo")

            throw redirect(redirectTo || "/account")
        }

        return null
    } catch (err) {
        return err
    }
}

export async function loader({ request }) {
    if (isAuthenticated()) {
        throw redirect("/account")
    }

    const searchParams = new URL(request.url).searchParams
    const loginMessage = searchParams.get("message")

    return loginMessage
}

export default function Login() {
    const loginMessage = useLoaderData()
    const error = useActionData()

    return (
        <div className="vh-container login">
            <Form method="post" className="loginForm">
                <h2 className="headline">Login</h2>
                {loginMessage && <div className="message">{loginMessage}</div>}
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

