import React from 'react';

import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import Logo from './common/Logo';
import Button from './common/Button';
import Avatar from '../components/Avatar';

const Navbar = () => {
    const {isAuthenticated, isLoading, user} = useSelector(state => state.auth);
    return(
        <nav className="flex items-center justify-between shadow-md px-5 py-3 relative bg-white">
            <Logo />
            {isLoading ? <Avatar loading={true} /> :  (isAuthenticated ? <Avatar name={user?.username} image={user?.image} /> : <Link to="/auth/login"><Button color="primary" >Login</Button></Link>)}
        </nav>
    );
};

export default Navbar;