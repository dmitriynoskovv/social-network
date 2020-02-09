import * as axios from "axios";


const instence = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ecf4e46f-deda-4b1c-8f3a-4727ea1a9575"
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
        return instence.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instence.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI obj');         // Информация другим программистам для контроля версий
        return profileAPI.getProfile(userId)

    }
};

export const profileAPI = {
    getProfile(userId) {
        return instence.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instence.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instence.put(`profile/status`, { status:status })
    }
};



export const authAPI = {
    me () {
        return instence.get(`auth/me`);
    },
    login (email, password, rememberMe = false) {
        return instence.post(`auth/login`, { email, password, rememberMe });
    },
    logout () {
        return instence.delete(`auth/login`);
    }
};
