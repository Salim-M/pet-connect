import React from "react";

import Spinner from "./Spinner";

const LoadingPage = ({ hideLogo = false }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      {!hideLogo && (
        <h1 className="font-pacifico text-blue-700 text-2xl">PetConnect</h1>
      )}
      <Spinner color="primary" />
    </div>
  );
};

export default LoadingPage;
