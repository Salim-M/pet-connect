import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "./common/Button";
import Avatar from "../components/Avatar";

const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  return (
    <nav className="navbar flex flex-row justify-between items-center shadow-md px-5 py-3 relative bg-white z-10">
      <Link to="/">
        <h1 className="font-pacifico text-blue-700 text-2xl">PetConnect</h1>
      </Link>
      {isLoading ? (
        <Avatar loading={true} />
      ) : isAuthenticated ? (
        <Link to="/user/listings">
          <Avatar name={user?.username} image={user?.image} />
        </Link>
      ) : (
        <Link to="/auth/login">
          <Button color="primary">Login</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
