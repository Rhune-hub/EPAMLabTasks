import React from 'react'
import Avatar from '../Avatar'
import UserInfo from '../UserInfo'
import './style.css';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router'

export default function UserDetails() {
    const user = useSelector(state => state.users.user);
    const {userId} = useParams();
    const navigate = useNavigate();

    if(user && userId === user.id) navigate(`/users/${user.id}`)

    if (!user) return null;
    return (
        <div  className="user-details__container">
            <div className="user-details__info">
                <Avatar src="/img/avatar.png"/>
                <UserInfo user={user}/>
            </div>
            <div className="user-details__content">
                <Outlet/>
            </div>   
        </div>
    )
}
