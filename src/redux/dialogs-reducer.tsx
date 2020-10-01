import {InferActionsTypes} from "./redux-store";


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
}

export const actions = {
    sendMessage: (newMessageBody: string) =>
        ({type: 'mypet/dialogs/SEND_MESSAGE', newMessageBody} as const),
}

const dialogsReducer = (state = initialState1, action: ActionsType):
    InitialStateType => {
    switch (action.type) {
        case 'mypet/dialogs/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}],
                //спред оператор создает копию примитивов.
                // Что бы скопировать массив на более глубоком уровне, отдельные объекты, массивы копируются отдельно.
                // Вместо Push, новый элемент дописывается справа (слева, если нужно)
            }
        default:
            return state;
    }
}

export default dialogsReducer;

export type InitialStateType = typeof initialState1
type ActionsType = InferActionsTypes<typeof actions>
type DialogType = {
    id: number
    name: string

}
type MessagesType = {
    id: number
    message: string

}