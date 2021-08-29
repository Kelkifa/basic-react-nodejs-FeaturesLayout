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
    adminGetAll: () => {
        const url = 'games/adminGet';
        return axiosClient.get(url);
    },
    delete: (data) => {
        const url = 'games/delete';
        return axiosClient.delete(url, data);
    }
}

export default gameApi;