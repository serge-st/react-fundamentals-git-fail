import { Switch, Route, Redirect } from "react-router-dom";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import { routes } from "../router/routes";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route => 
                <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            )}
            {/* <Route path="/about">
                <About />
            </Route>
            <Route exact path="/posts">
                <Posts />
            </Route>
            <Route exact path="/posts/:id">
                <PostIdPage />
            </Route> */}
            <Redirect to="/posts"/>
        </Switch>
    );
};

export default AppRouter;