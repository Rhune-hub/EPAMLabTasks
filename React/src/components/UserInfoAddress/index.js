import React from 'react'
import UserInfoElement from '../UserInfoElement'
import './style.css';

export default function UserInfoAddress({address}) {
    return (
        <div className="user-info-address__container">
            <div className="user-info-address__title"><span>Address</span></div>
            <div className="user-info-address__details">
                <UserInfoElement name="City" content={address.city}/>
                <UserInfoElement name="Street" content={address.street}/>
                <UserInfoElement name="Suite" content={address.suite}/>
                <UserInfoElement name="Zip-code" content={address.zipcode}/>
            </div>
        </div>
    )
}