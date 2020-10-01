import {PhotosType, ProfileType} from "../types/types";
import {instence, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instence.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instence.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instence.put<APIResponseType>(`profile/status`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instence.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => res.data)
    },

    saveProfile(profile: ProfileType) {
        return instence.put<APIResponseType>(`profile`, profile).then(res => res.data)
    }
};