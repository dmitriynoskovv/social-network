import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profil-reducer";
import connect from "react-redux/es/connect/connect";
import MyPost from "./MyPosts"


const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
//        updateNewPostText: (text) => {
//            let action = updateNewPostTextActionCreator(text);
//            dispatch(action);
//        },

        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostsContainer;