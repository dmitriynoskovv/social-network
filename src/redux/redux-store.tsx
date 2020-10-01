import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profil-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";        // Импорт специальногй редюсор формы из библиотеки форм. Добавляется единожды в основной стор.

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer; // (globalstate: GLOBALSTATE) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// https://habr.com/ru/company/alfa/blog/452620/
export type InferActionsTypes<T> = T extends {[key: string]: (...arg: any[]) => infer U} ? U : never

// AT - actions type дженерик. Для каждого типа редюсоров будет приходить свой тип.
// R - возвращаемое значение (Promise)
export type BaseThunkType <AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reduxStore = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = reduxStore

export default reduxStore