import React from 'react';
import MyPostsConteiner from './MyPosts/MyPostsConteiner';
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsConteiner />
        </div>
    )
};

export default Profile;