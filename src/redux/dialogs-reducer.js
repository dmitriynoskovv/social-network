const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState1 = {
    dialogsData: [
        {id: 1, name: "Dimon"},
        {id: 2, name: "Dimoon"},
        {id: 3, name: "Dimoooon"},
        {id: 4, name: "Kolya"},
        {id: 5, name: "Petya"}
    ],
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "hello, hi!"}
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState1, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = "";
            state.messagesData.push({id: 6, message: body});
            return state;
        default:
            return state;
         }
};


export const sendMessageCreator = () => ({    type: SEND_MESSAGE    });
export const updateNewMessageBodyCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body,
    }
};

export default dialogsReducer;