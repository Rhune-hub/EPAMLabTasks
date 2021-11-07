import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import './style.css'

export default function PhotoDetails() {
    const navigate = useNavigate();

    const {photoId} = useParams();
    const photo = useSelector(state => state.photos.photos.find(photo => photo.id === Number(photoId)));
    
    if (!photo) return null;
    return (
        <div className="photo-detail">
            <div className="photo-detail__big-photo-container" onClick={()=>navigate(-1)}>
                <h2 className="big-photo__title">Photo from album "{photo.title}"</h2>
                <img className="big-photo__image" src={photo.url} alt={`For ${photo.title}`}/>
            </div>
        </div>
    )
}
