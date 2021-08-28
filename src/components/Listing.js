import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import Slider from "react-slick";

import LoadingPage from "./common/LoadingPage";
import PrimaryLayout from "../layouts/PrimaryLayout";
import Avatar from "./Avatar";
import PetConnectApi from "../apis/PetConnectApi";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";

const Listing = () => {
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { param } = useParams();

  useEffect(() => {
    PetConnectApi.get(`/listings/${param}`)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch((err) => history.push("/"));
  }, [history, param]);

  if (loading) return <LoadingPage />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    adaptiveHeight: true,
  };

  const { address, name, images, animal, description, price, user } = listing;

  return (
    <PrimaryLayout>
      <Helmet>
        {loading ? (
          <title>Loading...</title>
        ) : (
          <title>Meet {name} | PetConnect</title>
        )}
      </Helmet>
      <div className="bg-gray-700">
        <Slider {...settings} className="w-3/4 mx-auto py-4">
          {images.map((image) => (
            <div className="mt-1" key={image.id}>
              <img
                src={image.url}
                alt={listing.name}
                className="mx-auto max-h-80"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 md:p-10">
        <div className="col-span-2 bg-white md:shadow md:rounded-xl p-8">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl text-gray-800">{name}</h1>
              <p className="text-gray-500 text-md">
                {address
                  ? `${address.district}, ${address.city}`
                  : "No address provided"}
              </p>
            </div>
            {price && (
              <div>
                <h2 className="text-4xl inline">2</h2>
                <span className="text-2xl text-gray-800">$</span>
              </div>
            )}
          </div>
          <div className="py-2 border-t text-gray-500 text-base font-light border-b my-10">
            {animal.name} · {address && address.address1}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl text-gray-800">Meet {name}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: description ?? "No description provided",
              }}
            />
          </div>
        </div>
        <div className="bg-white md:rounded-xl md:shadow mt-20 md:mt-11 p-5 relative">
          <div className="listing__user-avatar">
            <Avatar
              className="border-4 border-white w-24 h-24"
              name={user.username}
              image={user.image}
            />
          </div>
          <div className="mt-10 flex flex-col items-center">
            <h2 className="text-2xl text-gray-800 font-semibold">
              {user.username}
            </h2>
            <div className="flex w-3/4 space-x-8 justify-start mt-8">
              <LocationMarkerIcon className="w-5 h-5 mt-1" />
              <div className="space-y-2 font-base">
                {user.address.address1 ? (
                  <>
                    <p className="truncate">{user.address.address1}</p>
                    {user.address.address2 && (
                      <p className="truncate">{user.address.address2}</p>
                    )}
                    <p>{user.address.district}</p>
                    <p>{user.address.city}</p>
                  </>
                ) : (
                  <p>No address provided</p>
                )}
              </div>
            </div>
            <div className="flex w-3/4 space-x-8 items-center justify-start my-5">
              <PhoneIcon className="w-5 h-5 mt-1" />
              {user.phone ? (
                <a href={`tel:${user.phone}`} className="font-base">
                  {user.phone}
                </a>
              ) : (
                <p>No phone provided</p>
              )}
            </div>
            <div className="flex w-3/4 space-x-8 items-center justify-start mb-4">
              <MailIcon className="w-5 h-5 mt-1" />
              <a href={`mailto:${user.email}`} className="font-base truncate">
                {user.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Listing;
