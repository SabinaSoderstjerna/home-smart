import React from 'react';
import ReactDOM from 'react-dom';
import 'react-rangeslider/lib/index.css';

import LightList from './src/lights/lightList'
import Menu from './src/menu.js';

function App() {
  return (
    <div>
      <h1> Welcome to home-smart </h1>
      <p> An app to make your home smarter </p>
      < Menu />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);