import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../API/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,       // Для прелодера
    followingInProgress: [] as Array<number>        //Array of users ID
}
const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'mypet/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
    }
        case 'mypet/users/UNFOLLOW':        // Unfollow - неотрефекореная функция, для примера.
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
            }
        case 'mypet/users/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'mypet/users/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'mypet/users/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'mypet/users/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'mypet/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'mypet/users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'mypet/users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'mypet/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'mypet/users/SET_CURRENT_PAGE', currentPage: currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'mypet/users/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'mypet/users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'mypet/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


//thunk

export const requestUsers = (page: number, pageSize: number): ThunkType => {        //getUsersThunkCreator
    return async (dispatch, getState: () => AppStateType) => {      // Типизация Dispatch берется из библиотеки редакс. Данная типизация аналогична той, которая оформлена в ThunkType ( официальный способ)
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));

    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}


export const follow = (userId: number): ThunkType => {                                 //Unfolow - неотрефакторенный вариант, для примера
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = actions.unfollowSuccess;
        _followUnfollowFlow(dispatch, userId,apiMethod, actionCreator)
    }
}

export default usersReducer


type InitialState = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType <ActionsType>