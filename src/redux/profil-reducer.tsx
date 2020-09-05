import {profileAPI, usersAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";




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

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 100,
                message: action.newPostText,
                likeCount: 65
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: "",
            };    //делается копия объекта state для того, что бы была возможность его перерисовать
            // (стейт который остается неизмененным
            // встроенной в функцию connect не перерисовывается (в connect входит функция subscribe(паттерн observer))).
        }

//        case UPDATE_NEW_POST_TEXT: {
//            return {
//               ...state,
//                newPostText: action.newText,
//            }
//        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {...state, postsData: state.postsData.filter(p => p.id !== action.postId)}
        }

        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
        }


        default:
            return state;
    }
};


// ActionCreator, типизация  ->
type addPostActionCreatorActionType = {
     type: typeof ADD_POST
     newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
//export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status: status});

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

// Thunks ->

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};


export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};


export default profileReducer;