import React, { lazy } from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import configureStore from "./redux/store"

const reduxStore = configureStore(window.REDUX_INITIAL_DATA)

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  return (
    <>
      <ReduxProvider store={reduxStore}>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Place new routes over this */}
            <Route path="/app" component={Layout} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/app" />
          </Switch>
        </Router>
      </ReduxProvider>
    </>
  )
}

export default App
