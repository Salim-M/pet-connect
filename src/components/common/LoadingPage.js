import React from 'react';
import Logo from './Logo';
import Spinner from './Spinner';

const LoadingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <Logo />
            <Spinner color="primary" />
        </div>
    );
};

export default LoadingPage;