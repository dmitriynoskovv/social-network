import {GetItemsType, instence, APIResponseType} from "./api";

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instence.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data;
            });
    },

    follow(userId: number) {
        return instence.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instence.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
};