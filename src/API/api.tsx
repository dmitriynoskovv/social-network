import axios from "axios";
import {UserType} from "../types/types";

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {           // Общий тип - дженерик.
    data: D
    messages: Array<string>
    resultCode: RC
}


export const instence = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ecf4e46f-deda-4b1c-8f3a-4727ea1a9575"
    }
});

export enum ResultCodeEnum {       // Специальный тип при возврате ошибки числом с сервера превращает его в слово, для облегчения дебага
    Success,
    Error,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
