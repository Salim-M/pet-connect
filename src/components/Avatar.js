import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('');
}

const Avatar = ({loading, name, image, lg, className, ...rest}) => {
    if (loading) return <div className={`${lg ? 'w-20 h-20' : 'w-9 h-9'} rounded-full animate-pulse bg-gray-300`}></div>
    return (
        <div className={`${lg ? 'w-20 h-20 text-2xl' : 'w-9 h-9 text-sm'} bg-gray-200 font-semibold text-gray-800 flex items-center justify-center overflow-hidden rounded-full ${className}`} {...rest}>
            {image ? <LazyLoadImage src={image} alt={`${name}'s avatar`}  /> : getInitials(name)}
        </div>
    );
};

export default Avatar;