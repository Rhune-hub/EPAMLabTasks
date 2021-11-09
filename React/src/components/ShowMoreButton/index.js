import React, {useCallback} from 'react'
import { useDispatch } from 'react-redux';
import './style.css'

export default function ShowMoreButton({albumId, start, count }) {

    const dispatch = useDispatch();

    const addPhotos = useCallback((photos) => {
        dispatch({type: 'ADD_PHOTOS', payload: photos});
    }, [dispatch])

    const showMoreButtonClickHandler = useCallback(() => {
        fetch(`https://jsonplaceholder.typicode.com/album/${albumId}/photos?_start=${start}&_end=${start+count}`).then(res =>res.json())
        .then(photos => addPhotos(photos))
        .catch((e) => console.log(e.message));
    },[count, start, albumId, addPhotos]);

    return (
        <div className="show-more__container">
            <button className="show-more__button" onClick={showMoreButtonClickHandler}>Show More</button>
        </div>
    )
}
