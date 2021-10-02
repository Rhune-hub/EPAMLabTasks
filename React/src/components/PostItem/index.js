import React from 'react'
import './style.css';

export default function PostItem({text}) {
    return (
        <div className="post-item__container">
            <span>{text}</span>
        </div>
    )
}
