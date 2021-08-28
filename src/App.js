import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { loadUser } from "./actions/authActions";

import LoadingBar from "react-redux-loading-bar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./components/Listing";
import ScrollToTop from "./components/ScrollToTop";

import UserRoutes from "./routes/UserRoutes";

import "react-lazy-load-image-component/src/effects/blur.css";
import Listings from "./pages/Listings";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <LoadingBar className="bg-blue-700 fixed h-0.5 z-50" />
      <ToastContainer
        transition={Slide}
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/listings/:param" component={Listing} />
          <PrivateRoute guest path="/auth/login" component={Login} exact />
          <PrivateRoute
            guest
            path="/auth/register"
            component={Register}
            exact
          />
          <Route path="/listings" component={Listings} exact />
          <Route path="/user">
            <UserRoutes />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
