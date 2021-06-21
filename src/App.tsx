import React, {Component} from "react";
import './App.css';
import Nav from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginPage} from "./components/Login/loginPage"            // Если импорт в файле производится по дефолту, импортируемой функции можно задать произвольное имя
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import reduxStore, {AppStateType} from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))      //позволяет подгружать страницы по мере необходимости, после обращения к ней пользователя
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends Component <MapPropsType & DispatchPropsType> {

    catchAllUnhandlesErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occurred")
    }

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>

                    <HeaderContainer/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Switch>
                        <Route exact path="/"
                               render={() => <Redirect to={"/profile"}/>}/>

                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs /> }/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile /> }/>
                        <Route path="/users"
                               render={() => <UsersPage pageTitle={"Нинзи"}/>}/>
                        <Route path="/login"
                               render={() => <LoginPage/>}/>
                        <Route path="*"
                               render={() => <div>404 NOT FOUND</div>}/>
                        <Route path="/news"/>
                        <Route path="/music"/>
                        <Route path="/settings"/>
                        <Route path="/friends"/>
                        </Switch>
                    </div>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MyPetJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={reduxStore}>         {/*Провайдер добавляет стор в контекст, что позволяет вызывать его из дочерних компонентов с помощью функции Connect, mapStateToProps, mapDispatchToProps*/}
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default MyPetJSApp;