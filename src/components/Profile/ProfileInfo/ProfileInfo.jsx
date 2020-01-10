import React from 'react';
import obje from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader/>
    }

  return (
    <div>
      {/*<div>        <img  src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />     </div>*/}

      <div className={obje.descriptionBlock}>
          <img src = {props.profile.photos.large} />
          <ProfileStatus status={"Hello my friends!"}/>
      </div>

    </div>
  )
};

export default ProfileInfo;