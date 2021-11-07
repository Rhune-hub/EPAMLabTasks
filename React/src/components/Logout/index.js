import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { unsetUser } from '../../actions/usersActions';

export default function Logout() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(unsetUser());
    },[dispatch]);

    return <Navigate to="/login"/>;
}
