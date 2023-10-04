import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { requireAuth } from "/src/utils/auth"
import { getUserById } from "/src/utils/api"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Account() {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuthContext()
    if(!isAuthenticated) {
        return navigate("/login?message=You must login first.&redirectTo=/account")
    }

    return (
        <div className="vh-container account">
            <h1>Account</h1>
            {JSON.stringify(user)}
            <nav className="navigation"></nav>
            <Outlet></Outlet>
        </div>
    )
}