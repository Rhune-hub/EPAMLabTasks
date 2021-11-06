import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../actions/usersActions';
import './style.css'

export default function LoginForm() {
    
    const dispatch = useDispatch();
    const [isError, setError] = useState(null);

    const navigate = useNavigate();

    const loginHandler = useCallback((e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const { login, password } = form;
        const [ loginValue, passwordValue ] = [login.value, password.value];
        if (loginValue && passwordValue) {
            fetch(`https://jsonplaceholder.typicode.com/users?username=${passwordValue}&email=${loginValue}`)
              .then(res => res.json())
              .then(([user]) => {
                if (user) {
                    sessionStorage.setItem('user',JSON.stringify(user));
                    dispatch(setUser(user));
                    navigate('/');
                }
                else
                    setError('Incorrect user data!');
              })
              .catch((e) => console.log(e.message));
        } else 
            setError('Incorrect input!');
    }, [setUser, setError, navigate]);

    return (
        <div className="login__container">
            <form className="login__form" onSubmit={loginHandler}>
                <input type="text" className="login__input" name="login" placeholder="Login (email)"/>
                <input type="password" className="login__input" name="password" placeholder="Password (username)"/>
                <span>{isError}</span>
                <input type="submit" className="login__submit" value="login"/>
            </form>
        </div>
    )
}
