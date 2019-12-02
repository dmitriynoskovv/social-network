import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profil-reducer";
import MyPosts from "./MyPosts"
import StoreContext from "../../../StoreContext";


const MyPostsConteiner = () => {

    return (
        <StoreContext.Consumer>
            {    (store) => {
            let state = store.getState(); // getState - встроенная в редакс функция, которую ранее создавали в первом store
            let addPost = () => {
            store.dispatch(addPostActionCreator());
        };

            let onPostChange = (text) => {
            let action = updateNewPostTextActionCreator(text);
            store.dispatch(action);

        };
            return  <MyPosts updateNewPostText={onPostChange}
                addPost={addPost}
                postsData={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}
            /> }}
        </StoreContext.Consumer>
    )

};

export default MyPostsConteiner;