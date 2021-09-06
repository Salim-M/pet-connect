import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import PetConnectApi from "../apis/PetConnectApi";
import Card from "../components/Card";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchListings = () => {
    // dispatch(showLoading());
    PetConnectApi.get("/listings", {
      params: {
        page,
      },
    }).then((res) => {
      const { data, next_page_url } = res.data;
      setListings([...listings, ...data]);

      if (next_page_url) {
        setHasMore(true);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Helmet>
        <title>Listings | PetConnect</title>
      </Helmet>
      <div className="h-72 bg-gray-800 relative">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-gray-100 text-4xl">Listings</h1>
        </div>
        <Link to="/" className="absolute top-5 left-5 md:top-10 md:left-10">
          <div className="rounded-full bg-gray-100 w-9 h-9 flex items-center justify-center">
            <ChevronLeftIcon className="h-6 w-6 inline -ml-0.5" />
          </div>
        </Link>
      </div>
      <InfiniteScroll
        dataLength={listings.length}
        next={fetchListings}
        hasMore={hasMore}
        className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-screen p-5 md:p-10"
      >
        {listings.map((listing) => {
          const image =
            listing.images[0] === undefined ? "" : listing.images[0].url;
          return (
            <Link to={`/listings/${listing.slug}`}>
              <Card key={listing.id} name={listing.name} image={image} />
            </Link>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default Listings;
