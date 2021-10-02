import React from 'react'
import UserInfoElement from '../UserInfoElement'
import './style.css';

export default function UserInfoCompany({company}) {
    return (
        <div className="user-info-company__container">
            <div className="user-info-company__title"><span>Company</span></div>
            <div className="user-info-company__details">
                <UserInfoElement name="Name" content={company.name}/>
                <UserInfoElement name="Catch Phrase" content={company.catchPhrase}/>
                <UserInfoElement name="BS" content={company.bs}/>
            </div>
        </div>
    )
}
