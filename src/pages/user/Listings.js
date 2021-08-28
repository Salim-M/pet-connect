import React, { useEffect } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { loadUserListings } from "../../actions/listingsActions";

import Card from "../../components/Card";

const renderCards = (entities) => {
  const { listings, images } = entities;

  return Object.entries(listings)
    .reverse()
    .map(([key, obj]) => {
      return (
        <Card
          key={key}
          name={obj.name}
          slug={obj.slug}
          image={images[obj.images[0]]?.url}
        />
      );
    });
};

const Listings = () => {
  const dispatch = useDispatch();
  const { entities, isLoading } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(loadUserListings());
  }, []);

  return (
    <>
      <Helmet>
        <title>My Listings | PetConnect</title>
      </Helmet>
      <div className="p-4 grid md:p-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading
          ? [1, 2, 3, 4, 5].map((i) => <Card loading key={i} />)
          : renderCards(entities)}
      </div>
      <Link
        to="/user/listings/add"
        className="bg-blue-700 rounded-full fixed text-white px-3 py-2.5 right-10 bottom-12 transition-colors hover:bg-blue-800"
      >
        <PlusIcon className="inline w-5 h-5 -mt-1" />
      </Link>
    </>
  );
};

export default Listings;
