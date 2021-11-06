import React, {useCallback} from 'react'
import { useDispatch } from 'react-redux';
import './style.css'

export default function ShowMoreButton({url, start, count, addObjects }) {

    const dispatch = useDispatch();

    const showMoreButtonClickHandler = useCallback(() => {
        fetch(`${url}?_start=${start}&_end=${start+count}`).then(res =>res.json())
        .then(objs => dispatch(addObjects(objs)))
        .catch((e) => console.log(e.message));
    },[dispatch, count, start, url, addObjects]);

    return (
        <div className="show-more__container">
            <button className="show-more__button" onClick={showMoreButtonClickHandler}>Show More</button>
        </div>
    )
}
