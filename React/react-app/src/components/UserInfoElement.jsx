import React from 'react'

export default function UserInfoElement({name, content}) {
    return (
        <div className={`UserInfoElement-container ${name}`}>
            <span className="UserInfoElement-name">{name}</span>
            <span className="UserInfoElement-content">{content}</span>
        </div>
    )
}
