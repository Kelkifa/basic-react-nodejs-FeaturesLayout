const { default: axiosClient } = require("api/axiosClient")


const authApi = {
    login: (data) => {
        const url = '/auth/login';
        return axiosClient.get(url, data);
    },
    register: (data) => {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    }
}

export default authApi;