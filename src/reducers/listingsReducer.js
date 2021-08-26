import { LISTINGS_LOADED, LISTINGS_LOADING, SET_LISTINGS } from "../actions/types";

const initialState = {
    loading: null,
    next_page_url: null,
    prev_page_url: null,
    listings: []
};
const listingsReducer = (state = initialState, action) => {
    switch(action.type){
        case LISTINGS_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_LISTINGS:
            return {
                ...state,
                ...action.payload,
                listings: [...state.listings, ...action.payload.listings]
            }
        case LISTINGS_LOADED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default listingsReducer;