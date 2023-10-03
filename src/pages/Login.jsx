import { Form, useActionData } from "react-router-dom"
import { loginUser } from "../auth"

export async function action({ request }) {
    const formData = await request.formData()
    try {
        const data = await loginUser(formData.get("username"), formData.get("password"))

        if (data.message) {
            // Error
            return data
        } else {
            localStorage.setItem("user", JSON.stringify(data))
        }

        return null
    } catch (err) {
        return err
    }
}

export async function loader() {
    return null
}

export default function Login() {
    const error = useActionData()

    return (
        <div className="vh-container login">
            <Form method="post" className="loginForm">
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

