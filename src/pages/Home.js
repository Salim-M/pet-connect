import React from 'react';

import {Helmet} from "react-helmet";

import PrimaryLayout from '../layouts/PrimaryLayout';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | PetConnect</title>
            </Helmet>
            <PrimaryLayout>
                hi
            </PrimaryLayout>
        </>
    );
};

export default Home;