import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../API/chat-api";
import {Dispatch} from "redux";
import {FormAction} from 'redux-form/lib/actions'
import {v1} from "uuid";



let initialState = {
   messages: [] as ChatMessageType[],
   status: 'pending' as StatusType
}
type ChatMessageType = ChatMessageAPIType & {id: string}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'firstPet/chat/MESSAGES_RECEIVED':
         return {
            ...state,
            messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
               .filter((m, index, array) => index >= array.length - 100)
         }
      case 'firstPet/chat/STATUS_CHANGED':
         return {
            ...state,
            status: action.payload.status
         }
      default:
         return state;
   }
}

export const actions = {
   messagesReceived: (messages: ChatMessageAPIType[]) => ({
      type: 'firstPet/chat/MESSAGES_RECEIVED',
      payload: {messages}
   } as const),
   statusChanged: (status: StatusType) => ({
      type: 'firstPet/chat/STATUS_CHANGED',
      payload: {status}
   } as const)
}
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
   if (_newMessageHandler === null) {
      _newMessageHandler = (messages) => {
         dispatch(actions.messagesReceived(messages))
      }
   }
   return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
   if (_statusChangedHandler === null) {
      _statusChangedHandler = (status) => {
         dispatch(actions.statusChanged(status))
      }
   }
   return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
   chatAPI.start()
   chatAPI.subscribeOnNewMessages('message-received', newMessageHandlerCreator(dispatch))
   chatAPI.subscribeOnNewMessages('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
   chatAPI.unsubscribeFromNewMessages('message-received', newMessageHandlerCreator(dispatch))
   chatAPI.unsubscribeFromNewMessages('status-changed', statusChangedHandlerCreator(dispatch))
   chatAPI.stop()
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
   chatAPI.sendMessage(message)
};

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>