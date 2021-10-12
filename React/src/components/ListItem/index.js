import React from 'react'
import './style.css';

export default function ListItem({title, id, imgSrc, onClick}) {
    return (
        <li className="list__item" data-id={id} onClick={onClick}>
            <div className="list-item__container">
                {imgSrc ? <img src={imgSrc} alt={`for ${title}`}/> : <></>}
                <h3 className="list-item__title">{title}</h3>  
            </div>
        </li>
    )
}
