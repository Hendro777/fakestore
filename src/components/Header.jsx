import { Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = function () {
    const { user, isAuthenticated } = useAuthContext()

    return (
        <header className="header">
            <nav className='nav'>
                <MenuIcon fontSize="large" />
                <NavLink className='navlink' to='categories'>All Categories</NavLink>
                <NavLink className='navlink' to='deals'>Deals</NavLink>
                <NavLink className='navlink' to='about'>About</NavLink>
            </nav>
            <NavLink className="navlink-logo" to=""><h1 className='logo'>fakestore</h1></NavLink>
            <div className='account'>
                {isAuthenticated ? 
                <Link className="authenticated" to="/account">
                    <img className='user-thumbnail' src={user.image} />
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