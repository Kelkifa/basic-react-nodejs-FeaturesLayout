import axios from 'axios';
import queryString from 'query-string';
require('dotenv').config();

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});


// APi Resquest
axiosClient.interceptors.request.use(async config => {
    // Handle token here ...
    return config;
})

// API Response
axiosClient.interceptors.response.use(response => {
    if (response && response.data)
        return response.data;
    return response;
}, error => {
    //Handle Error
    throw error;
})

export default axiosClient;
