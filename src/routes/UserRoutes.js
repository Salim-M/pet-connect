import React from 'react';

import { useSelector } from "react-redux";
import { Redirect, Switch, useRouteMatch } from "react-router-dom"

import PrivateRoute from '../components/PrivateRoute';
import SecondaryLayout from "../layouts/SecondaryLayout";
import LoadingPage from '../components/common/LoadingPage';

import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import Listings from '../pages/user/Listings';
import Address from '../pages/user/Address';
import AddListing from '../pages/user/AddListing';


const UserRoutes = () => {
    const {isLoading} = useSelector(state => state.auth);
    const {path} = useRouteMatch();
    
    if(isLoading) return <LoadingPage />

    return (
        <SecondaryLayout>
            <Switch>
                <PrivateRoute path={`${path}/dashboard`} component={Dashboard} exact />
                <PrivateRoute path={`${path}/listings`} component={Listings} exact />
                <PrivateRoute path={`${path}/profile`} component={Profile} exact />
                <PrivateRoute path={`${path}/address`} component={Address} exact />

                <PrivateRoute path={`${path}/listings/add`} component={AddListing} exact />

                <Redirect from="/user" to="/user/dashboard" exact />
            </Switch>
        </SecondaryLayout>
        
    )
};

export default UserRoutes;