import React from 'react';

const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('');
}

const Avatar = ({loading, name, image}) => {
    if (loading) return <div className="w-9 h-9 rounded-full animate-pulse bg-gray-300"></div>
    return (
        <div className="w-9 h-9 bg-gray-200 font-semibold text-sm text-gray-800 flex items-center justify-center overflow-hidden rounded-full">
            {image ? <img src={image} alt={`${name}'s avatar`} /> : getInitials(name)}
        </div>
    );
};

export default Avatar;