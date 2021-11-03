import React, {useCallback} from 'react'
import { useDispatch } from 'react-redux';
import './style.css'

export default function PhotoDetails({photo, onBack}) {
    const dispatch = useDispatch();

    const unsetActivePhoto = useCallback(() => {
        dispatch({type:'UNSET_ACTIVE_PHOTO'});
    }, [dispatch])

    const photoDetailClickHandler = useCallback((e) => {
        unsetActivePhoto();
    }, [unsetActivePhoto]);
    
    return (
        <div className="photo-detail">
            <div className="photo-detail__big-photo-container" onClick={photoDetailClickHandler}>
                <h2 className="big-photo__title">Photo from album "{photo.title}"</h2>
                <img className="big-photo__image" src={photo.url} alt={`For ${photo.title}`}/>
            </div>
        </div>
    )
}
