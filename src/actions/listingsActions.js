// import {}

import { normalize } from "normalizr";
import { hideLoading, showLoading } from "react-redux-loading-bar"
import { toast } from "react-toastify";
import PetConnectApi from "../apis/PetConnectApi";

import { LISTINGS_LOADED, LISTINGS_LOADING, SET_LISTINGS } from "./types";

const listingsLoading = () => ({
    type: LISTINGS_LOADING
});

const setListings = (values) => ({
    type: SET_LISTINGS,
    payload: {
        next_page: values.next_page_url,
        prev_page: values.prev_page_url,
        listings: values.data
    }
});

const listingsLoaded = () => ({
    type: LISTINGS_LOADED
})

export const loadListings = () => (dispatch, getState) => {
    dispatch(showLoading());
    dispatch(listingsLoading());

    PetConnectApi.get('/listings')
    .then(res => {
        dispatch(listingsLoaded());
        dispatch(setListings(res.data));
    })
    .catch(err => {
        toast.error('Something went wrong');
        console.error(err);
    })
    .finally(() => {
        dispatch(hideLoading());
    })
}