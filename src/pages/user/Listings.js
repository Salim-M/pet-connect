import React from 'react';

import { Helmet } from 'react-helmet';

import Card from '../../components/Card';
import { PlusIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Listings = (props) => {
    return (
        <>
            <Helmet>
                <title>My Listings | PetConnect</title>
            </Helmet>
            <div className="p-4 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            </div>
            <Link to="/user/listings/add" className="bg-blue-700 rounded-full fixed text-white px-3 py-2.5 right-10 bottom-12 transition-colors hover:bg-blue-800"><PlusIcon className="inline w-5 h-5 -mt-1"/></Link>
        </>
    );
};

export default Listings;