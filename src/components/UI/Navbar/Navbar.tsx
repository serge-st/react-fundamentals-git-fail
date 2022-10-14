import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthCountext, LOCAL_STORAGE_AUTH_KEY } from "../../../context";
import MyButton from "../Button/MyButton";

const Navbar = () => {
    const context = useContext(AuthCountext);

    const logout = () => {
        context!.setIsAuthenticated(false);
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    }
    
    return (
        <nav className='navbar'>
            <MyButton name="Logout" onClick={logout} />
            <div className="navbar__links">
                <Link to='/about'>About</Link>
                <Link to='/posts'>Posts</Link>
            </div>
        </nav>
    );
};

export default Navbar;