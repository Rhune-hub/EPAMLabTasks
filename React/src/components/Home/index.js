import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
    const user = useSelector(state => state.users.user);
  
    if (user === undefined) return null;
    return user
      ? <Navigate to={`/user/${user.id}`}/>
      : <Navigate to="/albums"/>
  }