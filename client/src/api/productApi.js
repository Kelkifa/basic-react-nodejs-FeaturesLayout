const { default: axiosClient } = require("./axiosClient");

const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getOne: (data) => {
        const url = '/products';

        return axiosClient.post(url, data);
    },
    delete: (data) => {
        console.log('[PRODUCT API]', data);
        const url = '/products/delete';
        return axiosClient.patch(url, data);
    },
}

export default productApi;