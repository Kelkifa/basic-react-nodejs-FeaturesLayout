import axiosClient from "./axiosClient";

const cartApi = {
    getAll: () => {
        const url = '/carts';
        return axiosClient.get(url);
    },
    addCart: (data) => {
        const url = '/carts/add'
        return axiosClient.post(url, data);
    }
}

export default cartApi;