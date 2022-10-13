import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="navbar__links">
                <Link to='/about'>About</Link>
                <Link to='/posts'>Posts</Link>
            </div>
        </nav>
    );
};

export default Navbar;