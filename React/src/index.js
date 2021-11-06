import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import MyRouter from './components/router/Router';

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <App>
        {/* <MyRouter/> */} 
        </App> 
    </Router>
    </Provider>
  ,
  document.getElementById('root')
);
