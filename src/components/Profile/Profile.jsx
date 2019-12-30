import React from 'react';
import MyPostsConteiner from './MyPosts/MyPostsConteiner';
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsConteiner />
        </div>
    )
};

export default Profile;