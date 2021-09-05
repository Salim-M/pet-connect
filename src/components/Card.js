import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

// import { Link } from "react-router-dom";

const Card = ({ image, name, loading }) => {
  if (loading) {
    return (
      <div className="rounded-xl shadow-md p-2 bg-white">
        <div className="animate-pulse h-52 bg-gray-300 rounded-xl" />
        <div className="pt-3 pb-2 font-semibold text-xl rounded-t-md text-center">
          <div className="animate-pulse h-6 mx-auto w-24 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl shadow-md p-2 bg-white">
      <LazyLoadImage
        effect="blur"
        src={image}
        alt={name}
        wrapperClassName="w-full"
        className="w-full object-cover h-52 rounded-xl"
      />
      <div className="pt-3 pb-2 font-semibold text-xl rounded-t-md text-center">
        {name}
      </div>
    </div>
  );
};

export default Card;
