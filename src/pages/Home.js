import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Helmet} from "react-helmet";
import { loadListings } from '../actions/listingsActions';

import PrimaryLayout from '../layouts/PrimaryLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import PetConnectApi from '../apis/PetConnectApi';

const Home = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        PetConnectApi.get('/listings')
        .then(res => {
            const {data} = res.data;
            setListings(data);
            setLoading(false);
        });
    }, []);
    
    return (
        <PrimaryLayout>
            <Helmet>
                <title>Home | PetConnect</title>
            </Helmet>
            <Header />
            <div className="mt-20 space-y-10">
                <h2 className="text-center text-5xl font-light font-base text-blue-600">Pets Available for Adoption</h2>
                <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 md:p-20">
                    {loading ? (
                        [1,2,3,4,5].map(() => <Card loading />)   
                    ) : (
                        listings.map(listing => {
                            return <Card name={listing.name} slug={listing.slug} image={listing.images[0].url} />
                        })
                    )}
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Home;