import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

export default function AuthButton() {
    const navigate = useNavigate();

    const isAuth = useSelector(state => !!state.users.user);

    const Logout = () => {
        const logout = useCallback(() => navigate('/logout'), []);

        return (
            <button className="auth-button" onClick={logout}>Logout</button>
        )
    }

    const Login = () => {
        const login = useCallback(() => navigate('/login'), []);

        return (
            <button className="auth-button" onClick={login}>Login</button>
        )
    }

    return (
        <div className="auth-button__container">
                { isAuth 
                ? <Logout/>
                : <Login/> 
                }
        </div>
    )
}
