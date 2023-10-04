import { Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, Link } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';

const Header = function () {
    const user = isAuthenticated() ? getCurrentUser() : null
    console.log(user)

    return (
        <header className="header">
            <nav className='nav'>
                <MenuIcon fontSize="large" />
                <NavLink className='navlink' to='categories'>All Categories</NavLink>
                <NavLink className='navlink' to='deals'>Deals</NavLink>
                <NavLink className='navlink' to='about'>About</NavLink>
            </nav>
            <NavLink className="navlink-logo" to=""><h1 className='logo'>fakestore</h1></NavLink>
            <div className='btn-account'>
                {isAuthenticated()
                    ? <Link className='authenticated' to="/account">
                        <img src={user.image} />
                    </Link>
                    : <Link to="/login">
                        <Person />
                    </Link>}
            </div>
            {/* <div className='search'>
                <SearchIcon fontSize='large' />
                <input type="text" placeholder='Search'></input>
            </div> */}
        </header>
    )
}

export default Header