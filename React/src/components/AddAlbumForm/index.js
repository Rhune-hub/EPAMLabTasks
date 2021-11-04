import React, {useCallback, useState} from 'react'
import AddForm from '../AddForm';
import { useDispatch, useSelector } from 'react-redux';

export default function AddAlbumForm({isOpen, onClose}) {

    const dispatch = useDispatch();
    const user = useSelector(store => store.users.user);
    const localAlbums = useSelector(store => store.albums.localAlbums);

    const [isError, setError] = useState(false);

    const addAlbum = useCallback((album) => {
        dispatch({type:'ADD_ALBUM', payload: album});
    }, [dispatch])

    const addAlbumHandler = useCallback((e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form["new-album__title"].value;
        if (title) {
            const album = { userId: user.id, title };
            fetch(`https://jsonplaceholder.typicode.com/albums/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(album)
              })
              .then(res => res.json())
              .then(({id}) => {
                addAlbum({...album, id: id+localAlbums.length});
              })
              .catch((e) => console.log(e.message));

            onClose();
        } else 
            setError(true);
    }, [addAlbum, localAlbums, onClose, user]);

    return (
            <AddForm title="Add Album" onAdd={addAlbumHandler} isOpen={isOpen} isError={isError} onClose={onClose}>
                <input type="text" placeholder="Title" id="new-album__title"/>  
            </AddForm>
    )
}
