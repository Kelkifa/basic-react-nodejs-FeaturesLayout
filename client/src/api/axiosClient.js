import axios from 'axios';
import firebase from 'firebase';
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
    const currentUser = firebase.auth().currentUser;
    console.log('CURRENT USER', currentUser);
    if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }

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
