import React from 'react'
import './style.css';

export default class ListItem extends React.Component {
    render() {
        return (
            <li className="list__item">
                <div className="list-item__container">
                    <h3 className="list-item__title">{this.props.title}</h3>  
                </div>
            </li>
        )
    }
}
