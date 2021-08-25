import axiosClient from "./axiosClient";

const gameApi = {
    getAll: () => {
        const url = '/games';
        return axiosClient.get(url);
    },
    addMany: (data) => {
        const url = '/games';
        return axiosClient.post(url, data);
    },
}

export default gameApi;