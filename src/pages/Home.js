import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import PetConnectApi from "../apis/PetConnectApi";
import PrimaryLayout from "../layouts/PrimaryLayout";
import Header from "../components/Header";
import Card from "../components/Card";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    PetConnectApi.get("/listings").then((res) => {
      const { data, next_page_url } = res.data;
      setListings(data);
      setLoading(false);

      if (next_page_url !== null) setHasNext(true);
    });
  }, []);

  return (
    <PrimaryLayout>
      <Helmet>
        <title>Home | PetConnect</title>
      </Helmet>
      <Header />
      <div className="mt-20 space-y-10">
        <h2 className="text-center text-5xl font-light font-base text-blue-600">
          Pets Available for Adoption
        </h2>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 md:p-20">
          {loading
            ? [1, 2, 3, 4, 5].map((i) => <Card key={i} loading />)
            : listings.map((listing) => {
                const image =
                  listing.images[0] === undefined ? "" : listing.images[0].url;
                return (
                  <Card
                    key={listing.id}
                    name={listing.name}
                    slug={listing.slug}
                    image={image}
                  />
                );
              })}
        </div>
      </div>
      <div className="text-center text-sm mb-10">
        {hasNext && (
          <Link to="/listings" className="text-blue-500 underline">
            Show All
          </Link>
        )}
      </div>
    </PrimaryLayout>
  );
};

export default Home;
