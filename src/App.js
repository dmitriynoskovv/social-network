import React from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsConteiner";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileConteiner";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "../src/components/Login/login"         // Если импорт в файле производится по дефолту, импортируемой функции можно задать произвольное имя

const App = () => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}/>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>
                <Route path="/users"
                       render={() => <UsersContainer/>}/>
                <Route path="/login"
                       render={() => <LoginPage/>}/>
                <Route path="/news"/>
                <Route path="/music"/>
                <Route path="/settings"/>
                <Route path="/friends"/>
            </div>
        </div>
    );
};

export default App;