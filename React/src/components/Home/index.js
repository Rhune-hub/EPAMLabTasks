import { setUser } from "actions/usersActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
  
    const user = useSelector(state => state.users.user);
  
    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      dispatch(setUser(user));
    })
  
    if (user === undefined) return null;
    return user
      ? <Navigate to={`/user/${user.id}`}/>
      : <Navigate to="/albums"/>
  }