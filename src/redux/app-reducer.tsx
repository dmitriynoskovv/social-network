import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':

            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])              // когда будет много промисов, запуск диспатча произойдет только после того, как все они будут обработаны
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
};


export default appReducer;