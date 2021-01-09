import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/login';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <BrowserRouter>
        <CookiesProvider>
            {localStorage.getItem('username') ? (
                <Redirect to='/movies' />
            ) : (
                <Route path="/" exact component={() => <Login />} />
            )}
            <Route path="/movies" exact component={() => <App />} />
        </CookiesProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
