import { NavLink, Outlet, useLoaderData } from "react-router-dom"
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
    console.log(user)

    return (
        <main className="vh-container account">
            <div className="sidebar">
                <h3>Customer Center</h3>
                <span className="userInfo">
                    <span>{user.username}</span>
                    <span>{user.firstName} {user.lastName}</span>
                    <span>{user.email}</span>
                </span>
                <nav className="navigation">
                    <NavLink to="">Dashboard</NavLink>
                    <NavLink to="orders">My orders</NavLink>
                    <NavLink to="wishlists">Wishlists</NavLink>
                    <NavLink to="adresses">Adresses</NavLink>
                    <NavLink to="edit">Edit your account</NavLink>
                    <NavLink to="security">Security</NavLink>
                </nav>
            </div>
            <Outlet context={user}></Outlet>
        </main>
    )
}