import React, { useEffect } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { loadUserListings } from "../../actions/listingsActions";

import Card from "../../components/Card";

const Listings = () => {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth);

  const renderCards = (data) => {
    const { entities, result } = data;
    const { listings, images } = entities;
    return result.map((key) => {
      return (
        <Link to={`/user/listings/${key}/edit`} key={key}>
          <Card
            name={listings[key].name}
            image={images[listings[key]["images"][0]].url}
          />
        </Link>
      );
    });
  };

  useEffect(() => {
    dispatch(loadUserListings());
  }, []);

  return (
    <>
      <Helmet>
        <title>My Listings | PetConnect</title>
      </Helmet>
      {!user.address.address1 && (
        <div className="px-4 md:px-10 pt-4">
          <div className="bg-white shadow-md rounded-lg w-full font-semibold p-3 text-blue-500">
            It seems like you didn't provide your address yet, it's recommended
            to go ahead and add your address to your account
          </div>
        </div>
      )}
      <div className="p-4 grid md:p-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading
          ? [1, 2, 3, 4, 5].map((i) => <Card loading key={i} />)
          : renderCards(listings)}
      </div>
      {!isLoading && listings.result.length === 0 && (
        <div className="min-h-screen w-full flex items-center justify-center">
          <p className="text-xl">Please add some listings first</p>
        </div>
      )}
      <Link
        to="/user/listings/add"
        className="bg-blue-700 rounded-full fixed text-white px-3 py-2.5 right-8 bottom-14 transition-colors hover:bg-blue-800"
      >
        <PlusIcon className="inline w-5 h-5 -mt-1" />
      </Link>
    </>
  );
};

export default Listings;
