import axiosClient from "./axiosClient";

const gameApi = {
    getAll: () => {
        const url = '/games';
        return axiosClient.get(url);
    }
}

export default gameApi;