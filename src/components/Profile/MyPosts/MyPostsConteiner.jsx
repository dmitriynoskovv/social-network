import React from 'react';
import {addPostActionCreator} from "../../../redux/profil-reducer";
import MyPost from "./MyPosts"
import {connect} from "react-redux";


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