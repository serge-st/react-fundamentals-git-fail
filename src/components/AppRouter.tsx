import { FC, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthCountext } from '../context'
import { publicRoutes, privateRoutes } from '../router/routes'
import Loader from './UI/Loader/Loader'

const AppRouter: FC = () => {
  const context = useContext(AuthCountext)

  if (context!.isLoading) {
    return <Loader />
  }

  return (
    context!.isAuthenticated
      ? <Switch>
        {privateRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        )}
        <Redirect to='/posts' />
      </Switch>
      : <Switch>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        )}
        <Redirect to='/login' />
      </Switch>
  )
}

export default AppRouter
