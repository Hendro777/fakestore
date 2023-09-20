import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';

const Header = function () {
    return (
        <header className="header">
            <nav className='nav'>
                <MenuIcon fontSize="large" />
                <NavLink className='navlink'>Categories</NavLink>
                <NavLink className='navlink'>Discounts</NavLink>
                <NavLink className='navlink'>Brand New</NavLink>
            </nav>
            <NavLink className="navlink-logo"><h1 className='logo'>fakestore</h1></NavLink>
            <div className='search'>
                <SearchIcon fontSize='large' classes='icon' />
                <input type="text" placeholder='Search'></input>
            </div>
        </header>
    )
}

export default Header