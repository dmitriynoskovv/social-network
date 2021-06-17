import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;     // state определяется, как локальный, и не требует вызова через пропсы

    let dialogsElements = state.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messageElements = state.messagesData.map((m) => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }
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