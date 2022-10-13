import { Switch, Route, Redirect } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/posts">
                <Posts />
            </Route>
            <Redirect to="/posts"/>
        </Switch>
    );
};

export default AppRouter;