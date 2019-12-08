import profileReducer from "./profil-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";


let store;
store = {
    _state: {

        profilePage: {
            postsData: [
                {id: 1, message: "Hi", likeCount: 12},
                {id: 2, message: "It's my post", likeCount: 6},
                {id: 3, message: "Kolya", likeCount: 5},
                {id: 4, message: "Petya", likeCount: 7},
                {id: 5, message: "Dimoon", likeCount: 500}
            ],
            newPostText: ""
        },

        dialogsPage: {
            dialogsData: [
                {id: 1, name: "Dimon"},
                {id: 2, name: "Dimoon"},
                {id: 3, name: "Dimoooon"},
                {id: 4, name: "Kolya"},
                {id: 5, name: "Petya"}
            ],
            messagesData: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Hello"},
                {id: 3, message: "hello, hi!"}
            ],
            newMessageBody: ""
        },
    },

    _callSubscriber() {
        console.log("state change")
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;  // паттерн observer
    },

    dispatch: function (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);      // обновление state после возврата из reducer
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);                                              // уведомляем об измении подписчика (паттерн Observer)
    }
};




export default store;
window.state = store;

/*мой сайдбар sidebar*/
/*sidebar: [
    {name: "Olya"},
    {name: "Lena"},
    {name: "Lesya"},
    ]*/

// reducer - чистая функция, которая принимает части state и action применяет
// и возвращает по правилам имьютабельности либо новый state
// либо возвращает его неизменнным, если требуется, либо новую его копию (они же кусочки dispatch)

// action это обьект, у которого есть type через который вызывается нужный код

// дспатчить можно только объекты

// Инкапсуляция - механизм языка, позволяющий объеденить данные и методы, работающие с этими данными, в единый
// объект и скрыть детали реализации от пользователя.

// компонента это объект который возвращает JS разметку

// компонента - это функция которая принимает пропсы и возвращает JSX разметку

// Action creator - функция, которая возвращает екшин. У экшина есть как минимум свойство "тип" с помощью которого
// вызывается нужная функция

// Контейнерная компонента - обертка для обычной компоненты. Нужна для того,
// чтобы презентационная компонента не получала весь стор целиком

//Контекст - глобальная среда для хранения информации, для дочерних элементов Dom дерева

// Детерминированность - однозначная предопределённость чего-либо. При одних и тех же входных данных,
// должен получиться один и тот же результат

// Функциональные компоненты - чистые функции. При получении одних и тех же пропсов должен
// получиться один и тот же результат

// Чистая функция должна быть имьютабельной (не имеющей права изменить входные данные, а работает с копией)

// Функция Route отслеживает Url браузера и при совпадении перерисовывает страницу