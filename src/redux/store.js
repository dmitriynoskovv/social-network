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

// компонента - это функция которая принимает пропсы и возвращает JSX разметку. Альтернативный вариант - компонента это класс,
// который наследуется от React.Component


// Action creator - функция, которая возвращает экшин. У экшина есть как минимум свойство "тип" с помощью которого
// вызывается нужная функция

// Контейнерная компонента - обертка для обычной компоненты. Нужна для того,
// чтобы презентационная компонента не получала весь стор целиком

// Контекст - глобальная среда для хранения информации, для дочерних элементов Dom дерева

// Детерминированность - однозначная предопределённость чего-либо. При одних и тех же входных данных,
// должен получиться один и тот же результат

// Функциональные компоненты - чистые функции. При получении одних и тех же пропсов должен
// получиться один и тот же результат

// Чистая функция должна быть имьютабельной (не имеющей права изменить входные данные, а работает с копией)

// Функция Route отслеживает Url браузера и при совпадении перерисовывает страницу (при этом не имеет значения,
// каким образом урл попал в адресную строку)

// API - Application Programming Interface - интерфейс взаимодействия с программой.

// endpoint (конечная точка) - интерфейс сервера (server API). Он имеет несколько характеристик:
// 1: url
// 2: http-request type -  get/post (get - для получения инфы с сервера, post - отправка информации на сервер)
// 3: request payload - запрос на сервер
// 4: response data - ответ от сервера
// http codes - коды ответа от сервера в зависимости от которых должны выполняться определенные действия

// Server Rest API - конечная точка только одна ".../api/users" - отправляется CRUD (Create Reed Update Delete)
// запроса - GET, POST, PUT, DELETE, PATCH

// AJAX - Asynchronous JS and XML

//  DAL -  Data access layer

// Идемпотентность - свойство объекта или операции при повторном применении операции к объекту
// давать тот же результат, что и при первом. (get запрос к серверу никак не меняет состояние сервера, сколько бы раз
// не был отправлен)

// rest api - договоренность/стандарт при котором отправка запросов на сервер производится на один и тот же URL адрес

// Json - текстовый формат обмена данными, основаный на джаваскрипт

// Классы (конструкторы) - имеют заранее заданные свойства которые настраивает пользователь.

// Функциональная компонента - функция, которая принимает пропсы и возвращает JSX

// Функция connect не перерисовывает элементы разметки, если они остались неизменными,
// после первой отрисовки, а отрисовывает лишь те элементы которые изменились

// Все Side Effect делаются в методе жизненного цикла componentDidMount

// DAL - Data Access Layer

// thunk - санка - функция, которая делает асинхронную задачу
// и умеет диспатчить обычные экшены. Санку так же можно задиспатчить.
// callback функция - функция выполняемая в ответ на возникновение события.


// High Order Component - компонент высшего порядка.

// Классы используются для того, чтобы создавать однотипные объекты


// componentDidUpdate - метод жизненного цикла, который срабатывает при любом изменении, либо пропсов, либо локального стейта

// Правила чистых функций (№88):
// 1. Имьютабельность (неизменяемость) - чистая функция не должна мутировать данные, которые в нее поступают (возвращается копия)
// 2. Чистая функция объязательно возвращает данные
// 3. В чистых функциях отсутствуют сайд эффекты (нет мутирования, асинхронных запросов и т.д.)
// 4. Детерминированность (Идемпотентность) - при получении одних и тех же данных, получаем один и тот же ответ




props.setUsers([
        {
            id: 1,
            photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
            followed: true,
            fullName: "Dimka",
            status: "React JS is cool!!!",
            location: {city: "Kyiv", country: "Ukraine",}
        },
        {
            id: 2,
            photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
            followed: false,
            fullName: "Vasyok",
            status: "Hi",
            location: {city: "Odessa", country: "Ukraine",}
        },
        {
            id: 3,
            photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
            followed: true,
            fullName: "Kolyan",
            status: "Whatsaaap",
            location: {city: "Vinnytsa", country: "Ukraine",}
        },
        {
            id: 4,
            photoUrl: "https://f9.pmo.ee/Quh1erzzUA2rDcN0UWZRsi8mdLA=/685x0/smart/nginx/o/2018/07/02/7931323t1hfc89.png",
            followed: false,
            fullName: "Jeka",
            status: "Hello world",
            location: {city: "Lviv", country: "Ukraine",}
        },
    ]
)