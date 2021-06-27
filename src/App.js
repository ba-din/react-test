import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
import { AuthProvider } from './context/authContext';
import { routWithFetchProvider as FetchProvider } from './context/fetchContext';
import Page404 from './views/pages/page404/Page404';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={loading}>
      <Switch>
        <Route
          path="/login"
          name="Login Page"
          render={(props) => <Login {...props} />}
        />
        <Route exact path="/">
          <Redirect to="/e-voucher" />
        </Route>
        <Route
          path="/e-voucher"
          name="EVoucher"
          render={(props) => <TheLayout {...props} />}
        />
        <Route
          path="/"
          name="home"
          render={(props) => <TheLayout {...props} />}
        />
        <Route
          exact
          path="*"
          name="404 - Not Found"
          render={(props) => <Page404 {...props} />}
        />
      </Switch>
    </React.Suspense>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <FetchProvider>
        <AppRoutes />
      </FetchProvider>
    </AuthProvider>
  </Router>
);

export default App;
