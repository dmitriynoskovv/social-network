import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";


const Dialogs = (props) => {

    let state = props.dialogsPage;     // state определяется, как локальный, и не требует вызова через пропсы

    let dialogsElements = state.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messageElements = state.messagesData.map((m) => <Message message={m.message} id={m.id} key={m.id}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMassage();
    };
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    };

    if (props.isAuth === false) return <Redirect to={"/login"}/> ;


       return (
        <div className={style.dialogs}>

            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={style.messages}>
                <div>{messageElements}</div>
                <div>
                    <div><textarea value = {newMessageBody}
                                   onChange={ onNewMessageChange }
                                   placeholder="Enter your message"></textarea></div>
                    <div><button onClick={ onSendMessageClick }>Send</button></div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;