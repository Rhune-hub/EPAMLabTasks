import React from 'react'

export default function Avatar({src}) {
    return (
        <div className="Avatar-container">
            <picture className="Avatar-picture">
                <img className="Avatar-image" src={src} alt="User avatar"/>
            </picture>
        </div>  
    )
}
