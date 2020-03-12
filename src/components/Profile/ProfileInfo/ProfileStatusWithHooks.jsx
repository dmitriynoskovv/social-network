import React, {useEffect, useState} from 'react';


const ProfileStatusWithHooks = (props) => {

    /*let stateWithSetState = useState(true);
    let editMode = stateWithSetState[0];              // destructuring assignment
    let setEditMode = stateWithSetState[1];*/           // destructuring assignment следвующая строчка - сокращенная версия 3х строчек выше

    let [editMode, setEditMode] = useState(false );
    let [status, setStatus] = useState(props.status );

    useEffect( () => {
        // !!! Функция, которая выполнится после того, как произойдет отрисовка. Используется для того, что бы совершать дополнительные отрисовки, уже после того, как основной рендер произошел
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
        };


    return (
        <div>
            { !editMode &&
            <div>
                <b>Status:</b><span onDoubleClick={ activateEditMode }>{props.status || "---------"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                       autoFocus={true}
                       onBlur={ deactivateEditMode }
                       onChange={ onStatusChange }
                       value={status}
                />
            </div>
            }
        </div>
    )
}



export default ProfileStatusWithHooks;