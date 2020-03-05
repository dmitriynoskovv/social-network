import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import MyPetJSApp from "./App";


ReactDOM.render(<MyPetJSApp/>, document.getElementById('root'));


// eslint-disable-next-line no-undef
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



