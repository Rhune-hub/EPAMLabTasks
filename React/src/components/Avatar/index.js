import React from 'react'
import './style.css'

export default function Avatar({src}) {
    return (
        <div className="avatar__container">
            <picture className="avatar__picture">
                <img className="avatar__image" src={src} alt="User avatar"/>
            </picture>
        </div>  
    )
}
