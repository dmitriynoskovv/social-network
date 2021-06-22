import React from 'react';
import {Link} from "react-router-dom";
import {Button, Row } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors';
import {logout} from "../../redux/auth-reducer";


export const LoginLogout: React.FC = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }

    return <Row>
        { isAuth ? <div>{login}  <Button onClick={logoutCallback}>Log out</Button> </div>
            : <Button><Link to={'/login'}>Login</Link></Button>}
    </Row>
}