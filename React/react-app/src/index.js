import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import user from './user'


ReactDOM.render(
  <React.StrictMode>
    <App user={user}/> 
  </React.StrictMode>,
  document.getElementById('root')
);
