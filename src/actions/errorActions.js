import {SET_ERROR} from './types';

export const setError = (message, type, id) => {
    return {
        type: SET_ERROR,
        payload: {
            message, type, id
        }
    };
}