import React, {useState} from 'react'
import store from '../../store';
import AddForm from '../AddForm';
import { useDispatch, useSelector } from 'react-redux';

export default function AddAlbumForm({isOpen, onClose}) {

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const [isError, setError] = useState(false);

    const addAlbumHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form["new-album__title"].value;
        if (title) {
            const album = { userId: user.id, title };
            dispatch({type:'ADD_ALBUM', payload: album});
            onClose();
        } else 
            setError(true);
    };

    return (
            <AddForm title="Add Album" onAdd={addAlbumHandler} isOpen={isOpen} isError={isError} onClose={onClose}>
                <input type="text" placeholder="Title" id="new-album__title"/>  
            </AddForm>
    )
}
