import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import connect from "react-redux/es/connect/connect";


/*const DialogsContainer = (props) => {

    return (

        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState().dialogsPage;     // state определяется, как локальный, и не требует вызова через пропсы


                let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator());
                };
                let onNewMessageChange = (body) => {
                    store.dispatch(updateNewMessageBodyCreator(body));
                };

                return <Dialogs updateNewMessageBody={onNewMessageChange}
                                sendMassage={onSendMessageClick}
                                dialogsPage={state}/>
            }
            }
        </StoreContext.Consumer>
    );
};*/  // контейнерная компонента. Заменили на DialogsContainer

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) =>{
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMassage: () => {
            dispatch(sendMessageCreator());
        }
    }
};


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;