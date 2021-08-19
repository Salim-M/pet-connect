import axios from 'axios';

export default axios.create({
    // baseURL: 'http://pet-connect-api.herokuapp.com/api/v1',
    baseURL: 'http://127.0.0.1:8000/api/v1',
    timeout: 10000
});