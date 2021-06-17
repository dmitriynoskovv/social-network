import style from "./DialogsItem.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {

    return (
        <div className={style.dialog}>
            <div>
                <img src="https://www.vokrug.tv/pic/person/a/c/1/0/ac106ad67ce63e4c52b43f29dc3b1039.jpg"/>
            </div>
            <NavLink to={"/dialogs/" + props.id} className={style.dialog} activeClassName={style.activeLink}>{props.name}</NavLink>
        </div>
    );
};


export default DialogItem;