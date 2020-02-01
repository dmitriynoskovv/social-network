import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";



const Dialogs = (props) => {

    let state = props.dialogsPage;     // state определяется, как локальный, и не требует вызова через пропсы

    let dialogsElements = state.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messageElements = state.messagesData.map((m) => <Message message={m.message} id={m.id} key={m.id}/>);
    let newMessageBody = state.newMessageBody;

//    let onSendMessageClick = () => {
//        props.sendMassage();
//    };
//    let onNewMessageChange = (e) => {
//        let body = e.target.value;
//        props.updateNewMessageBody(body);
//    };

    let addNewMessage = (values) => {
        props.sendMassage(values.newMessageBody);
    }

    if (props.isAuth === false) return <Redirect to={"/login"}/> ;


       return (
        <div className={style.dialogs}>

            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={style.messages}>
                <div>{messageElements}</div>

            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
};

export default Dialogs;