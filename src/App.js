import React, {Component} from "react";
import './App.css';
import Nav from './components/Navbar/Navbar';
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/login"            // Если импорт в файле производится по дефолту, импортируемой функции можно задать произвольное имя
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileConteiner";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))      //позволяет подгружать страницы по мере необходимости, после обращения к ней пользователя
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))


class App extends Component {

    componentDidMount() {

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
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
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


let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MyPetJSApp = (props) => {
    return <HashRouter >
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default MyPetJSApp;