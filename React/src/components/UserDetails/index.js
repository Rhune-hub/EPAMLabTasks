import React from 'react'
import Avatar from '../Avatar'
import UserInfo from '../UserInfo'
import Albums from '../Albums';
import './style.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'

export default function UserDetails() {
    const user = useSelector(state => state.users.user);
    const {userId} = useParams();
    const navigate = useNavigate();

    if(user && Number(userId) !== user.id) navigate(`/user/${user.id}`);

    if (user === undefined) return null;
    return (
        <div  className="user-details__container">
            <div className="user-details__info">
                <Avatar src="/img/avatar.png"/>
                <UserInfo user={user}/>
            </div>
                <Albums/>
        </div>
    )
}
