import { Switch, Route, Redirect } from "react-router-dom";
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
            <Redirect to="/posts"/>
        </Switch>
    );
};

export default AppRouter;