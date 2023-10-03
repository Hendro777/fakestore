import { Form } from "react-router-dom"

export default function Login() {
    return (
        <div className="vh-container login">
            <Form className="loginForm">
                <h2 className="headline">Login</h2>
                <label for="email">
                    E-Mail
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address *" />
                </label>

                <label for="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password *" />
                </label>



                <button type="submit">
                    Log in
                </button>
            </Form>
        </div>
    )
}

