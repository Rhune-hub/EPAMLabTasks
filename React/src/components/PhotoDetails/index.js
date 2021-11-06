import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import './style.css'

export default function PhotoDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {albumId, photoId} = useParams();

    const [photo, setPhoto] = useState(null);
    const photos = useSelector(state => state.photos.photos);

    // const unsetActivePhoto = useCallback(() => {
    //     dispatch({type:'UNSET_ACTIVE_PHOTO'});
    // }, [dispatch])

    const photoDetailClickHandler = useCallback((e) => {
        navigate(-1);
    }, [navigate]);

    const loadFromServer = useCallback((photoId) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?id=${photoId}`)
                .then(res => res.json())
                .then(([data]) => setPhoto(data))
                .catch((e) => console.log(e.message));
        
    }, []);

    useEffect(() => {
         loadFromServer(photoId) ;
        // if (activePhoto)
        //     setPhoto(activePhoto);
        // else
        //    navigate(-1);
    }, []);
    console.log(photo)
    if (!photo) return null;
    return (
        <div className="photo-detail">
            <div className="photo-detail__big-photo-container" onClick={photoDetailClickHandler}>
                <h2 className="big-photo__title">Photo from album "{photo.title}"</h2>
                <img className="big-photo__image" src={photo.url} alt={`For ${photo.title}`}/>
            </div>
        </div>
    )
}
