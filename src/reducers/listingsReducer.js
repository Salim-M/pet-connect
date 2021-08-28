import { SET_USER_LISTINGS, USER_LISTINGS_LOADING } from "../actions/types";

const initialState = {
  isLoading: true,
  page: null,
  hasNext: false,
  entities: {},
};

const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LISTINGS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_LISTINGS:
      return {
        ...state,
        entities: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default listingsReducer;
