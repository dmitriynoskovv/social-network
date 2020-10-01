import {instence} from "./api";

type GetCatpchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instence.get<GetCatpchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    },
};