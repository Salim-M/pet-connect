import axios from 'axios';

export default axios.create({
    // baseURL: 'http://pet-connect-api.herokuapp.com/api/v1',
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 20000
});