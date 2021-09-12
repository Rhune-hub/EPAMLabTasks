import React from 'react'
import UserInfoElement from './UserInfoElement'

export default function UserInfoCompany({company}) {
    return (
        <div className="UserInfoCompany-container">
            <div className="UserInfoCompany-title"><span>Company</span></div>
            <div className="UserInfoCompany-details">
                <UserInfoElement name="Name" content={company.name}/>
                <UserInfoElement name="Catch Phrase" content={company.catchPhrase}/>
                <UserInfoElement name="BS" content={company.bs}/>
            </div>
        </div>
    )
}
