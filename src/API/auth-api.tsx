import {instence, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

type MeResponseType = {
        id: number
        email: string
        login: string
}

type LoginResponseType = {
        userId: number
}

export const authAPI = {
    me() {
        return instence.get<APIResponseType<MeResponseType>>(`auth/me`).then(res => res.data)         // Любой запрос (get post put delete) является дженериком и его тип можно задавать вручную
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instence.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instence.delete(`auth/login`);
    }
}