import React from "react";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import connect from "react-redux/es/connect/connect";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
//        updateNewMessageBody: (body) =>{
//            dispatch(updateNewMessageBodyCreator(body));
//       },
        sendMassage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
};



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
) (Dialogs);