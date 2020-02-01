import {profileAPI, usersAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = "SET_STATUS";

let initialState = {
    postsData: [
        {id: 1, message: "Hi", likeCount: 12},
        {id: 2, message: "It's my post", likeCount: 6},
        {id: 3, message: "Kolya", likeCount: 5},
        {id: 4, message: "Petya", likeCount: 7},
        {id: 5, message: "Dimoon", likeCount: 500}
    ],

    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {

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
        default:
            return state;
    }
};

// ActionCreator  ->
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
//export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setStatus = (status) => ({type: SET_STATUS, status: status});

// Thunks ->

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        });
};

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
};

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
                dispatch(setUserProfile(response.data));

        });
};

export default profileReducer;