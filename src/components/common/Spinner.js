import React from "react";
import PropTypes from "prop-types";

const getSpinnerClasses = (color, size) => {
  let classes = ["animate-spin"];
  switch (color) {
    case "primary":
      classes = [...classes, "text-blue-700"];
      break;
    default:
      classes = [...classes, "text-white"];
      break;
  }

  switch (size) {
    case "lg":
      classes = [...classes, "h-10", "w-10"];
      break;
    case "md":
      classes = [...classes, "h-8", "w-8"];
      break;
    default:
      classes = [...classes, "h-5", "w-5"];
      break;
  }

  return classes.join(" ");
};

const Spinner = ({ color, size, className }) => (
  <svg
    className={`${getSpinnerClasses(color, size)} ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

Spinner.prototype = {
  color: PropTypes.oneOf(["primary", "default"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
};

Spinner.defaultProps = {
  color: "default",
  size: "sm",
};

export default Spinner;
