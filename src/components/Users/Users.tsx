import React, {useEffect} from "react";
import Paginator from "../Common/Paginator/Pagenator";
import User from "./User";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {MemorizedUsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";

type PropsType = {
}

export const Users: React.FC<PropsType> = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    return <div>
        <MemorizedUsersSearchForm onFilterChanged={onFilterChanged}/>


        < Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                                     followingInProgress={followingInProgress}
                                     unfollow={unfollow}
                                     follow={follow}
                />)
            }
        </div>
    </div>
}