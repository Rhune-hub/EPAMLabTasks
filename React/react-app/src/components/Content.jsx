import React from 'react'
import PostItem from './PostItem'

export default function Content({content}) {
    return (
        <div class="Content-container">
            <div className="Content-title"><h2>{content.title}</h2></div>
            <div className="Content-posts">
                {content.posts.map(post => <PostItem text={post}/>)}
            </div>
        </div>
    )
}
