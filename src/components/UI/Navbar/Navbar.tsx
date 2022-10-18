import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthCountext, LOCAL_STORAGE_AUTH_KEY } from "../../../context";
import Button from "../Button/Button";

const Navbar = () => {
    const context = useContext(AuthCountext);

    const logout = () => {
        context!.setIsAuthenticated(false);
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    }
    
    return (
        <nav className='navbar'>
            <Button name="Logout" onClick={logout} />
            <div className="navbar__links">
                <Link to='/about'>About</Link>
                <Link to='/posts'>Posts</Link>
            </div>
        </nav>
    );
};

export default Navbar;