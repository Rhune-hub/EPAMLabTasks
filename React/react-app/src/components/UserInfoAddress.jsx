import React from 'react'
import UserInfoElement from './UserInfoElement'

export default function UserInfoAddress({address}) {
    return (
        <div className="UserInfoAddress-container">
            <div className="UserInfoAddress-title"><span>Address</span></div>
            <div className="UserInfoAddress-details">
                <UserInfoElement name="City" content={address.city}/>
                <UserInfoElement name="Street" content={address.street}/>
                <UserInfoElement name="Suite" content={address.suite}/>
                <UserInfoElement name="Zip-code" content={address.zipcode}/>
            </div>
        </div>
    )
}