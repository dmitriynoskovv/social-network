import preloader from "../../../assets/images/126.gif";
import React from "react";

type PropsType = {
}

let Preloader: React.FC = (props) => {
    return     <div>
        <img src={preloader}/>
    </div>
}

export default Preloader;