import { SET_ERROR } from "../actions/types";

const initialState = {
    message: null,
    type: null,
    id: null
};

const errorReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default errorReducer;