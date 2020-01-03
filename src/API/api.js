import * as axios from "axios";


const instence = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "8cd57926-dd0d-4d7a-a42d-1beff9da9980"
    }
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instence.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    follow(userId) {
        return instence.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },

    unfollow(userId) {
        return instence.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}



export const usersAPI2 = {
    getUsers2 () {
        return instence.get(`auth/me`)
            .then(response => {
                return response.data;
            });
    }
}