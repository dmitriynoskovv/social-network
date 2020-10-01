import {stopSubmit} from "redux-form";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../API/api";
import {authAPI} from "../API/auth-api";
import {securityAPI} from "../API/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Action, Dispatch} from "redux";


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null      // If null, then captcha is not required
};
  // тайпскрипт берет в качестве типа initialState

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'firstPet/auth/SET_USER_DATA':                     // Сокращенная форма для случаев, когда код одинаковый.
        case 'firstPet/auth/GET_CAPTCHA_URL_SUCCESS':

            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'firstPet/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    }as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'firstPet/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    }as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string ): ThunkType =>
    async (dispatch) => {

    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
     if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
         dispatch(getCaptchaUrl());
     }
        let message = data.messages.length > 0 ? data.messages [0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {

    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null,false))}
};

export default authReducer;

