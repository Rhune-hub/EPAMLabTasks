import React from 'react'
import { Link, useLocation, useMatch, useParams, useResolvedPath } from 'react-router-dom'
import './style.css'

export default function ListItem({title, to, imgSrc, onClick}) {

    return (
        <li className="list__item" onClick={onClick}>
            <Link to={to} className="list-item__container">
                {imgSrc ? <img className="list-item__image" src={imgSrc} alt={`for ${title}`}/> : <></>}
                <h3 className="list-item__title">{title}</h3>  
            </Link>
        </li>
    )
}
