import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

export default function Modal({title, isOpen, onClose, children}) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal__container" onClick={(e)=>{if(e.target.className==="modal__container") onClose()}}>

        <div className="modal">
            <div className="modal__title-container">
                <span className="modal__title">{title}</span>
            </div>
            <div className="modal__body">
                {children}
                <button className="modal__close" onClick={onClose}>Close</button>
            </div>
        </div>
        </div>
    ,document.body);
}
