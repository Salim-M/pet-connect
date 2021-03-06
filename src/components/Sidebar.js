import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import {
  ViewListIcon,
  CogIcon,
  LocationMarkerIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

import Avatar from "../components/Avatar";
import { handleLogoutUser } from "../actions/userActions";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const disptach = useDispatch();

  return (
    <div className="bg-white py-4 px-2 fixed h-screen shadow-lg secondary_layout__sidebar">
      <div className="h-full flex flex-col justify-between items-center">
        <Link to="/">
          <h1 className="font-pacifico text-white px-2.5 py-1 bg-blue-700 rounded-full text-xl -mb-5">
            P
          </h1>
        </Link>
        <div className="flex flex-col space-y-2">
          <NavLink
            to="/user/listings"
            className="px-2.5 py-1.5 rounded-lg shadow-md"
            activeClassName="bg-blue-700 shadow-lg text-white"
          >
            <ViewListIcon className="inline w-4 h-4 -mt-1" />
          </NavLink>
          <NavLink
            to="/user/address"
            className="px-2.5 py-1.5 rounded-lg shadow-md"
            activeClassName="bg-blue-700 shadow-lg text-white"
          >
            <LocationMarkerIcon className="inline w-4 h-4 -mt-1" />
          </NavLink>
          <NavLink
            to="/user/profile"
            className="px-2.5 py-1.5 rounded-lg shadow-md"
            activeClassName="bg-blue-700 shadow-lg text-white"
          >
            <CogIcon className="inline w-4 h-4 -mt-1" />
          </NavLink>
        </div>
        {user !== null && (
          <div
            className="bg-red-600 rounded-full p-2 cursor-pointer"
            onClick={() => disptach(handleLogoutUser())}
          >
            <LogoutIcon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
