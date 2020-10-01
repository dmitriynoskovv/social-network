import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../API/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    postsData: [
        {id: 1, message: "Hi", likeCount: 12},
        {id: 2, message: "It's my post", likeCount: 6},
        {id: 3, message: "Kolya", likeCount: 5},
        {id: 4, message: "Petya", likeCount: 7},
        {id: 5, message: "Dimoon", likeCount: 500}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'mypet/profile/ADD_POST': {
            let newPost = {
                id: 100,
                message: action.newPostText,
                likeCount: 65
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: "",
            };    //делается копия объекта state для того, что бы была возможность его перерисовать и не вносились изменения в начальный стейт
            // (стейт который остается неизмененным
            // встроенной в функцию connect не перерисовывается (в connect входит функция subscribe(паттерн observer))).
        }
//        case UPDATE_NEW_POST_TEXT: {
//            return {
//               ...state,
//                newPostText: action.newText,
//            }
//        }

        case 'mypet/profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'mypet/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'mypet/profile/DELETE_POST': {
            return {...state, postsData: state.postsData.filter(p => p.id !== action.postId)}
        }
        case 'mypet/profile/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
        }
        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'mypet/profile/ADD_POST', newPostText}as const),
    setUserProfile: (profile: ProfileType) => ({type: 'mypet/profile/SET_USER_PROFILE', profile}as const),
    setStatus: (status: string) => ({type: 'mypet/profile/SET_STATUS', status: status}as const),
    deletePost: (postId: number) => ({type: 'mypet/profile/DELETE_POST', postId}as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'mypet/profile/SAVE_PHOTO_SUCCESS', photos} as const)
}

// Thunks ->

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};


export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error ("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
export type ThunkType = BaseThunkType <ActionsType | FormAction>
export type ActionsType = InferActionsTypes<typeof actions>