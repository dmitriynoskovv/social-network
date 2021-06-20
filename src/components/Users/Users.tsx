import React from "react";
import Paginator from "../Common/Paginator/Pagenator";
import User from "./User";
import {UserType} from "../../types/types";
import {FilterType} from "../../redux/users-reducer";
import {MemorizedUsersSearchForm} from "./UsersSearchForm";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,
                                      ...props}) => {

    return <div>
        <MemorizedUsersSearchForm onFilterChanged = {props.onFilterChanged}/>


        < Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                                     followingInProgress={props.followingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                />)
            }
        </div>
    </div>

}


export default Users;