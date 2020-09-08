import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../types/types";


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

    follow(userId: number) {
        return instence.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instence.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI obj');         // Информация другим программистам для контроля версий
        return profileAPI.getProfile(userId)

    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instence.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instence.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instence.put(`profile/status`, { status:status })
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instence.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    }
            )
    },

    saveProfile(profile: ProfileType) {
        return instence.put(`profile`, profile)
    }
};

export enum ResultCodeEnum {       // Специальный тип при возврате ошибки числом с сервера превращает его в слово, для облегчения дебага
    Success,
    Error,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
           id: number
           email: string
           login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeForCaptcha | ResultCodeEnum
    messages: Array<string>
}

export const authAPI = {
    me () {
        return instence.get<MeResponseType>(`auth/me`).then(res => res.data)         // Любой запрос (get post put delete) является дженериком и его тип можно задавать вручную
    },
    login (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instence.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout () {
        return instence.delete(`auth/login`);
    }
}


export const securityAPI = {
    getCaptchaUrl() {
        return instence.get(`security/get-captcha-url`);
    },
};