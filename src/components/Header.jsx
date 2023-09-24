import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';

const Header = function () {
    return (
        <header className="header">
            <nav className='nav'>
                <MenuIcon fontSize="large" />
                <NavLink className='navlink' to='categories'>All Categories</NavLink>
                <NavLink className='navlink'>Deals</NavLink>
                <NavLink className='navlink'>About</NavLink>
            </nav>
            <NavLink className="navlink-logo" to=""><h1 className='logo'>fakestore</h1></NavLink>
            <div className='search'>
                <SearchIcon fontSize='large' />
                <input type="text" placeholder='Search'></input>
            </div>
        </header>
    )
}

export default Header