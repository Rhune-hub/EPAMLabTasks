import React from 'react'
import Avatar from '../Avatar'
import UserInfo from '../UserInfo'
import userObject from '../../data/user.json'
import './style.css';


export default function UserDetails() {
    const user = userObject;
    
     return (
        <div className="user-details__container" data-user-id={user.id}>
            <Avatar src={user.avatar}/>
            <UserInfo user={user.info}/>
        </div>
    )
}
