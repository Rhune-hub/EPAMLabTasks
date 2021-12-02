import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Auth({redirect, children}) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user 
        ? children 
        : typeof redirect === 'string' 
            ? <Navigate to={redirect}/> 
            : redirect;
}
