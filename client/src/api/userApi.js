import axiosClient from './axiosClient';

const userApi = {
    getMe: (userId) => {
        const url = '/auth/login';
        return axiosClient.post(url, { userId });
    }
}

export default userApi;