import {GetItemsType, instence, APIResponseType} from "./api";



export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instence.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}` ))
            .then(res => res.data)
    },

    follow(userId: number) {
        return instence.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instence.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
};