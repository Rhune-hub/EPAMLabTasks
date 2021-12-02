import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function ListItem({title, to, imgSrc}) {

    return (
        <li className="list__item">
            <Link to={to} replace className="list-item__container">
                {imgSrc ? <img className="list-item__image" src={imgSrc} alt={`for ${title}`}/> : <></>}
                <h3 className="list-item__title">{title}</h3>  
            </Link>
        </li>
    )
}
