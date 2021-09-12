import React from 'react'
import UserInfoElement from './UserInfoElement'
import UserInfoAddress from './UserInfoAddress'
import UserInfoCompany from './UserInfoCompany'

export default function UserInfo({user}) {
    return (
        <div className="UserInfo-container">
            <UserInfoElement name="Name" content={user.name}/>
            <UserInfoElement name="Username" content={user.username}/>
            <UserInfoElement name="E-mail" content={user.email}/>
            <UserInfoElement name="Phone" content={user.phone}/>
            <UserInfoElement name="Site" content={user.website}/>
            <UserInfoAddress address={user.address}/>
            <UserInfoCompany company={user.company}/>
        </div>
    )
}
