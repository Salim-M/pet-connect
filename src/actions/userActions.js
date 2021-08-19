import { hideLoading, showLoading } from "react-redux-loading-bar";
import PetConnectApi from "../apis/PetConnectApi"

export const updateAvatar = (image) => dispatch => {
    dispatch(showLoading());
    const data = new FormData();
    
    data.append('_method', 'put');
    data.append('image', image);
    
    PetConnectApi.post("/user/avatar", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .finally(() => {
        dispatch(hideLoading());
    })
    
};