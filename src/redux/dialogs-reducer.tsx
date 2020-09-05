//const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
    id: number
    name: string

}
type MessagesType = {
    id: number
    message: string

}

let initialState1 = {
    dialogsData: [
        {id: 1, name: "Dimon"},
        {id: 2, name: "Dimoon"},
        {id: 3, name: "Dimoooon"},
        {id: 4, name: "Kolya"},
        {id: 5, name: "Petya"}
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "hello, hi!"}
    ] as Array<MessagesType>,
};

export type InitialStateType = typeof initialState1

const dialogsReducer = (state = initialState1, action: any): InitialStateType => {

    switch (action.type) {
        //case UPDATE_NEW_MESSAGE_BODY:
            //return {
            //    ...state,
            //    newMessageBody: action.body,            //создает в скопированном массиве
            //};

        case SEND_MESSAGE:

            let body = action.newMessageBody;

            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}],      //спред оператор создает копию примитивов.
                // Что бы скопировать массив на более глубоком уровне, отдельные объекты, массивы копируются отдельно.
                // Вместо Push, новый элемент дописывается справа (слева, если нужно)
            };

        default:
            return state;
    }
};

type SandMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}


export const sendMessageCreator = (newMessageBody: string): SandMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})
//export const updateNewMessageBodyCreator = (newMessageBody) => {
//    return {
//        type: UPDATE_NEW_MESSAGE_BODY,
//        newMessageBody: newMessageBody
//    }
//};

export default dialogsReducer;