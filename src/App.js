import React, {Component} from "react";
import './App.css';
import Nav from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsConteiner";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileConteiner";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/login"            // Если импорт в файле производится по дефолту, импортируемой функции можно задать произвольное имя
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";


class App extends Component {

    componentDidMount() {
    debugger;
        this.props.initializeApp();

    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

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
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

