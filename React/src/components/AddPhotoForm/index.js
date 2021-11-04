import React, {useState, useCallback} from 'react'
import AddForm from '../AddForm';
import { useDispatch, useSelector } from 'react-redux';

export default function AddPhotoForm({isOpen, onClose}) {

    const dispatch = useDispatch();
    const activeAlbum = useSelector(store => store.albums.activeAlbum);

    const [isError, setError] = useState(false);

    const addPhoto = useCallback((photo) => {
        dispatch({type:'ADD_PHOTO', payload: photo});
    }, [dispatch]);

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

            fetch(`https://jsonplaceholder.typicode.com/albums/${activeAlbum.id}/photos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(photo)
          })
          .then(res => res.json())
          .then(({id}) => {
            addPhoto(photo);
          })
          .catch((e) => console.log(e.message));
            onClose();
        } else
            setError(true);
    };

    return (
            <AddForm title="Add Photo" onAdd={addPhotoHandler} isOpen={isOpen} isError={isError} onClose={onClose}>
                <input type="text" placeholder="Title" id="new-photo__title"/>  
                <input type="url" placeholder="URL" id="new-photo__url"/>  
                <input type="url" placeholder="Thumbnail URL" id="new-photo__thumbnail-url"/>  
            </AddForm>
    )
}
