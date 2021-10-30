import React, {useState} from 'react'
import store from '../../store';
import AddForm from '../AddForm';
import { useDispatch, useSelector } from 'react-redux';

export default function AddPhotoForm({isOpen, onClose}) {

    const dispatch = useDispatch();
    const activeAlbum = useSelector(store => store.activeAlbum);

    const [isError, setError] = useState(false);

    const addPhotoHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fields = ["new-photo__title", "new-photo__url", "new-photo__thumbnail-url"];
        const [title, url, thumbnailUrl] = fields.map(field => form[field].value);
        if (title && url && thumbnailUrl) {
            const photo = {
                albumId: activeAlbum.id,
                title: title,
                url: url,
                thumbnailUrl: thumbnailUrl
            };
            dispatch({type:'ADD_PHOTO', payload: photo});
            onClose();
        } else
            setError(true);
    };

    return (
            <AddForm title="Add Album" onAdd={addPhotoHandler} isOpen={isOpen} isError={isError} onClose={onClose}>
                <input type="text" placeholder="Title" id="new-photo__title"/>  
                <input type="url" placeholder="URL" id="new-photo__url"/>  
                <input type="url" placeholder="Thumbnail URL" id="new-photo__thumbnail-url"/>  
            </AddForm>
    )
}
