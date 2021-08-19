import React from 'react';

import Navbar from '../components/Navbar';

const PrimaryLayout = ({children, ...rest}) => {
    return (
        <>
            <Navbar />
            <main {...rest}>
                {children}
            </main>
        </>
    );
};

export default PrimaryLayout;