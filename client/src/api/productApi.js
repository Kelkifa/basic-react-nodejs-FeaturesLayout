const { default: axiosClient } = require("./axiosClient");

const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getOne: (data) => {
        const url = '/products';
        console.log(data);
        return axiosClient.post(url, data);
    }
}

export default productApi;