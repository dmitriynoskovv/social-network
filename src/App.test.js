import React from 'react';
import ReactDOM from 'react-dom';
import MyPetJSApp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyPetJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
