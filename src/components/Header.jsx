import { Person, ShoppingBag, ShoppingBagOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, Link } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import { useShopContext } from "../hooks/useShopContext";

const Header = function () {
  const user = isAuthenticated() ? getCurrentUser() : null;
  console.log(user);
  const { cartItems } = useShopContext();

  return (
    <header className="header">
      <div className="container header__container row">
        <label className="burger-menu nav-toggle-label col" for="nav-toggle">
          <MenuIcon fontSize="large" />
        </label>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav className="nav nav--primary col">
          <div className="nav__container">
            <NavLink className="nav__link" to="">
              Home
            </NavLink>
            <NavLink className="nav__link nav__link--account" to="account">
              Account
            </NavLink>
            <NavLink className="nav__link" to="categories">
              All Categories
            </NavLink>
            <NavLink className="nav__link" to="products">
              Products
            </NavLink>
            <NavLink className="nav__link" to="about">
              About
            </NavLink>
          </div>
        </nav>
        <NavLink className="logo col" to="">
          <h1 className="logo__title">fakestore</h1>
        </NavLink>
        <nav className="nav nav--secondary col">
          <Link className="btn-link btn-cart" to="/cart">
            {cartItems.size > 0 && (
              <span className="badge">{cartItems.size}</span>
            )}
            <ShoppingBagOutlined fontSize="large" />
          </Link>
          {isAuthenticated() ? (
            <Link className="btn-link authenticated btn-account" to="/account">
              <img src={user.image} />
            </Link>
          ) : (
            <Link className="btn-link btn-account" to="/login">
              <Person />
            </Link>
          )}
        </nav>

        {/* <div className='search'>
                <SearchIcon fontSize='large' />
                <input type="text" placeholder='Search'></input>
            </div> */}
      </div>
    </header>
  );
};

export default Header;
