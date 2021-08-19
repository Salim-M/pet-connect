import React, {useEffect} from 'react';

import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './actions/authActions';


import LoadingBar from 'react-redux-loading-bar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            <LoadingBar className="bg-blue-700 absolute h-0.5 z-10" />
            <ToastContainer />
            <Router>
                <Switch>
                    <PrivateRoute guest path="/auth/login" component={Login} exact />
                    <PrivateRoute guest path="/auth/register" component={Register} exact />
                    
                    <Route path="/" component={Home} exact />
                </Switch>
            </Router>
        </>
    );
};

export default App;