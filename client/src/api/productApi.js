const { default: axiosClient } = require("./axiosClient");

const productApi = {
    adminGetAll: () => {
        const url = '/products/adminGet';
        return axiosClient.get(url);
    },
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getOne: (data) => {
        const url = '/products';

        return axiosClient.post(url, data);
    },
    update: (data) => {
        const url = '/products/update';
        return axiosClient.put(url, data);
    },
    delete: (data) => {
        const url = '/products/delete';
        return axiosClient.patch(url, data);
    },
    forceDelete: (data) => {
        const url = '/products/delete'
        return axiosClient.delete(url, data);
    },
    add: (data) => {
        const url = '/products/add';
        return axiosClient.post(url, data);
    },
    getDelete: () => {
        const url = '/products/getDelete';
        return axiosClient.get(url);
    },
    restore: (data) => {
        const url = '/products/restore';
        return axiosClient.patch(url, data);
    },
}

export default productApi;