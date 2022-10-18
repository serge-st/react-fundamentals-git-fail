import { useContext } from "react";
import Button from "../components/UI/Button/Button";
import MyInput from "../components/UI/Input/MyInput";
import { AuthCountext, LOCAL_STORAGE_AUTH_KEY } from "../context";

const Login = () => {
    const context = useContext(AuthCountext);
    const login = (event: React.FormEvent): void => {
        event.preventDefault();
        context!.setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'true');
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={e => login(e)}>
                <MyInput type="text" placeholder="Login"  />
                <MyInput type="password" placeholder="Password" />
                <Button name="Login" />
            </form>
        </div>
    );
};

export default Login;