import React, {Component} from "react";
import './App.css';
import {HashRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/loginPage"
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import reduxStore, {AppStateType} from "./redux/redux-store";
import 'antd/dist/antd.css'
import {Layout, Menu} from 'antd';
import {SmileOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginLogout} from "./components/LoginLogout/LoginLogout";


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))      //позволяет подгружать страницы по мере необходимости, после обращения к ней пользователя
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

class App extends Component <MapPropsType & DispatchPropsType> {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

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
        const {collapsed} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                            <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                            <Menu.Item key="2">Settings</Menu.Item>
                            <Menu.Item key="3"><Link to="/dialogs">Massages</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/chat">Chat</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Developers">
                            <Menu.Item key="6"><Link to="/developers">Developers</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<SmileOutlined/>}>
                            <LoginLogout/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Switch>
                                <Route exact path="/"
                                       render={() => <Redirect to={"/profile"}/>}/>
                                <Route path='/dialogs'
                                       render={() => <SuspendedDialogs/>}/>
                                <Route path='/profile/:userId?'
                                       render={() => <SuspendedProfile/>}/>
                                <Route path="/developers"
                                       render={() => <UsersPage pageTitle={"Developers"}/>}/>
                                <Route path="/login"
                                       render={() => <LoginPage/>}/>
                                <Route path="/chat"
                                       render={() => <SuspendedChatPage/>}/>
                                <Route path="*"
                                       render={() => <div>404 NOT FOUND</div>}/>

                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Created by </Footer>
                </Layout>
            </Layout>
        )
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
        <Provider
            store={reduxStore}>         {/*Провайдер добавляет стор в контекст, что позволяет вызывать его из дочерних компонентов с помощью функции Connect, mapStateToProps, mapDispatchToProps*/}
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default MyPetJSApp;