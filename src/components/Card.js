import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link } from 'react-router-dom';




const Card = ({image, name, slug, loading}) => {
    return (
        <div className="rounded-xl shadow-lg p-2 bg-white">
            {loading ? <div className="animate-pulse h-56 bg-gray-300 rounded-xl" /> : <LazyLoadImage effect="blur" src={image} alt={name} wrapperClassName="w-full" className="w-full object-fill h-56 rounded-xl" />}
            <div className="pt-3 pb-2 font-semibold text-xl rounded-t-md text-center">
                {loading ? <div className="animate-pulse h-6 mx-auto w-24 bg-gray-300 rounded" /> : <Link to={`/listings/${slug}`}>{name}</Link>}
            </div>
        </div>
    );
};

export default Card;