import { Outlet, useLoaderData } from "react-router-dom"
import { requireAuth } from "/src/utils/auth"
import { getUserById } from "/src/utils/api"

export async function loader({ request }) {
    await requireAuth(request)

    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"))
    const user = await getUserById(loggedInUser.id)


    return user
}

export default function Account() {
    const user = useLoaderData()

    return (
        <div className="vh-container account">
            <h1>Account</h1>
            {JSON.stringify(user)}
            <nav className="navigation"></nav>
            <Outlet></Outlet>
        </div>
    )
}