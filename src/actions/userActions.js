import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";
import PetConnectApi from "../apis/PetConnectApi"
import { UPDATE_USER } from "./types";

const updateUser = (payload) => ({
    type: UPDATE_USER,
    payload
})

export const updateUserImage = (image) => dispatch => {
    dispatch(showLoading());
    
    const data = new FormData();
    
    data.append('_method', 'patch');
    data.append('image', image);
    
    PetConnectApi.post("/user", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(res => {
        dispatch(
            updateUser({
                image: res.data.image
            })
        );
    })
    .catch(() => toast.error('Something went wrong, please try again later'))
    .finally(() => {
        dispatch(hideLoading());
    })
    
};

export const updateUserAddress = (values, actions) => (dispatch, getState) => {
    const address = getState().auth.user.address;
    dispatch(showLoading());
    dispatch(updateUser({
        address: {
            ...values
        }
    }));

    PetConnectApi.post('/user/address', {
        _method: 'put',
        ...values
    })
    .catch(() => {
        actions.resetForm({
            values: address
        });
        toast.error('Something went wrong while trying to update your address');
    })
    .finally(() => {
        actions.setSubmitting(false);
        dispatch(hideLoading());
    })
}

export const handleUpdateUser = (values, actions) => (dispatch, getState) => {
    const user = getState().auth.user;
    
    if(values.username === user.username && values.phone === user.phone){
        toast.error('These fields you tried to update exist already');
        actions.setSubmitting(false);
        return;
    }

    dispatch(showLoading());
    dispatch(updateUser(values));

    PetConnectApi.post("/user", {
        _method: 'put',
        username: values.username,
        phone: values.phone
    })
    .catch(() => {
        dispatch(updateUser(user));
        actions.resetForm();
    })
    .finally(() => {
        dispatch(hideLoading());
        actions.setSubmitting(false);
    })
}