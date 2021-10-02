import React from 'react'
import PostItem from '../PostItem'
import './style.css'
import contentObject from '../../data/content.json'

export default function Content() {
    const content = contentObject;

    return (
        <div class="content__container">
            <div className="content__title"><h2>{content.title}</h2></div>
            <div className="content__posts">
                {content.posts.map(post => <PostItem text={post}/>)}
            </div>
        </div>
    )
}
