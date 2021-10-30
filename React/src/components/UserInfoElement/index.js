import React from 'react'
import './style.css';

export default function UserInfoElement({name, content}) {
    return (
        <div className={`user-info-element__container ${name}`}>
            <span className="user-info-element__name">{name}</span>
            <span className="user-info-element__content">{content}</span>
        </div>
    )
}
