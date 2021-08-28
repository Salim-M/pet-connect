import { toast } from "react-toastify";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { normalize } from "normalizr";
import { SET_USER_LISTINGS, USER_LISTINGS_LOADING } from "./types";

import PetConnectApi from "../apis/PetConnectApi";
import listingSchema from "../schemas/listingSchema";

// import { LISTINGS_LOADED, LISTINGS_LOADING, SET_LISTINGS } from "./types";

// const listingsLoading = () => ({
//   type: LISTINGS_LOADING,
// });

// const setListings = (values) => ({
//   type: SET_LISTINGS,
//   payload: {
//     next_page: values.next_page_url,
//     prev_page: values.prev_page_url,
//     listings: values.data,
//   },
// });

// const listingsLoaded = () => ({
//   type: LISTINGS_LOADED,
// });

// export const loadListings = () => (dispatch, getState) => {
//   dispatch(showLoading());
//   dispatch(listingsLoading());

//   PetConnectApi.get("/user/listings")
//     .then((res) => {
//       dispatch(listingsLoaded());
//       dispatch(setListings(res.data));
//     })
//     .catch((err) => {
//       toast.error("Something went wrong");
//       console.error(err);
//     })
//     .finally(() => {
//       dispatch(hideLoading());
//     });
// };

const setUserListings = (listings) => ({
  type: SET_USER_LISTINGS,
  payload: listings.entities,
});

export const loadUserListings = () => (dispatch) => {
  dispatch(showLoading());

  PetConnectApi.get("/user/listings")
    .then(({ data }) => {
      const normalizedListings = normalize(data.listings, [listingSchema]);
      dispatch(setUserListings(normalizedListings));
    })
    .finally(() => {
      //
      dispatch(hideLoading());
    });
};

export const addListing = (values, actions) => (dispatch) => {
  dispatch(showLoading());

  const { images, has_address } = values;
  const data = new FormData();

  Object.keys(values).forEach((key) => {
    if (values[key] !== "") data.append(key, values[key]);
  });

  data.delete("images");
  data.delete("has_address");
  for (let i = 0; i < images.length; i++) {
    data.append(`images[${i}]`, images[i]);
  }
  data.append("has_address", has_address ? 1 : 0);

  PetConnectApi.post("/listings", data)
    .then((res) => {
      toast.success("Listing created successfully");
    })
    .catch((err) => console.error(err))
    .finally(() => {
      dispatch(hideLoading());
      actions.resetForm();
    });
};
