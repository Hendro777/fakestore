import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { requireAuth } from "/src/utils/auth";
import { getUserById } from "/src/utils/api";

export async function loader({ request }) {
  await requireAuth(request);

  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = await getUserById(loggedInUser.id);

  return user;
}

export default function Account() {
  const user = useLoaderData();
  console.log(user);

  return (
    <main className="vh-container vh-container--light account">
      <div className="container account__container">
        <div className="sidebar">
          <div className="sidebar__content">
            <h3>Customer Center</h3>
            <span className="sidebar__userInfo">
              <span>{user.username}</span>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <span>{user.email}</span>
            </span>
            <nav className="navigation">
              <NavLink to="" className="navigation__navlink">
                Dashboard
              </NavLink>
              <NavLink to="orders" className="navigation__navlink">
                My orders
              </NavLink>
              <NavLink to="wishlists" className="navigation__navlink">
                Wishlists
              </NavLink>
              <NavLink to="adresses" className="navigation__navlink">
                Adresses
              </NavLink>
              <NavLink to="edit" className="navigation__navlink">
                Edit your account
              </NavLink>
              <NavLink to="security" className="navigation__navlink">
                Security
              </NavLink>
            </nav>
          </div>
        </div>
        <Outlet context={user}></Outlet>
      </div>
    </main>
  );
}
