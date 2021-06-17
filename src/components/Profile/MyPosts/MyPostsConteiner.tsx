import React from 'react';
import {actions} from "../../../redux/profil-reducer";
import MyPosts, {MapPropsType, DispatchPropsType} from "./MyPosts"
import {connect} from "react-redux";
import MyPostsMemorized from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";



const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData
    }
}


const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;