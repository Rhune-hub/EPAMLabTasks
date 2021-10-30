import React from 'react'
import Modal from '../Modal'
import './style.css'

export default function AddForm({isOpen, isError, onClose, title, onAdd, children}) {
    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose}>
            <div className="add-form__container">
                <form className="add-form" onSubmit={onAdd}>
                    {children}
                    { isError
                    ? ( <div className="add-form__error-container">
                            <span className="error">Incorrect value(-s)</span>    
                        </div>)
                    : (<></>)}
                    <input type="submit" className="add-form__submit" value="Add"/>
                </form>
                
            </div>
        </Modal>
    )
}
