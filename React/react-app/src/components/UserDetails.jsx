import React from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'

export default function UserDetails({user}) {
    return (
        <div className="UserDetails-container" data-user-id={user.id}>
            <Avatar src={user.avatar}/>
            <UserInfo user={user.info}/>
        </div>
    )
}
