import React from 'react';

import Sidebar from '../components/Sidebar';

const SecondaryLayout = ({children, className, ...rest}) => {
    
    return (
        <>
            <Sidebar />
            <main className={['seconday_layout__container', className].join('')} {...rest}>
                {children}
            </main>
        </>
    );
};

export default SecondaryLayout;