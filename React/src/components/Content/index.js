import React, {useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import AddAlbumForm from '../AddAlbumForm';
import AddPhotoForm from '../AddPhotoForm';
import PhotoDetails from '../PhotoDetails';
import AlbumDetails from '../AlbumDetails';
import { useState } from 'react';

export default function Content() {
    const dispatch = useDispatch();
    
    const localAlbums = useSelector(state => state.albums.localAlbums);
    const albums = useSelector(state => state.albums.albums);
    const activeAlbum = useSelector(state => state.albums.activeAlbum);
    const activePhoto = useSelector(state => state.photos.activePhoto);
    const localPhotos = useSelector(state => state.photos.localPhotos);
    const photos = useSelector(state => state.photos.photos);

    const [open, setOpen] = useState(false);

    const setActiveAlbum = (albumId) => {
        dispatch({type:'SET_ACTIVE_ALBUM', payload: albumId});
    }

    const unsetActiveAlbum = () => {
        dispatch({type:'UNSET_ACTIVE_ALBUM'});
    }

    const setActivePhoto = (photoId) => {
        dispatch({type:'SET_ACTIVE_PHOTO', payload: photoId});
    }

    const unsetActivePhoto = () => {
        dispatch({type:'UNSET_ACTIVE_PHOTO'});
    }

    const setPhotos = (photos) => {
        dispatch({type:'SET_PHOTOS', payload: photos});
    }

    const unsetPhotos = () => {
        dispatch({type:'UNSET_PHOTOS'});
    }
    
    const setAlbums = (albums) => {
        dispatch({type:'SET_ALBUMS', payload: albums});
    }

    ///
    const addAlbum = useCallback(() => {
        dispatch({type:'ADD_ALBUM', payload: {...album, id:albums.length+localAlbums.length+1, userId}});
    }, [dispatch, albums, localAlbums, userId])

    const setActiveAlbum = useCallback((albumId) => {
        dispatch({type:'SET_ACTIVE_ALBUM', payload: albumId});
    }, [dispatch])
    
    const setAlbums = useCallback((albums, userId) => {
        dispatch({type:'SET_ALBUMS', payload: {albums, userId}});
    }, [dispatch])
    
    const albumClickHandler = useCallback((e) => {        
        const currentId = Number(e.currentTarget.dataset.id);
        setActiveAlbum(currentId);
    }, [setActiveAlbum]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(res => res.json())
            .then(data => setAlbums(data, userId))
            .catch((e) => console.log(e.message));
    },[setAlbums, userId]);
    
    const albumClickHandler = useCallback((e) => {        
        const currentId = Number(e.currentTarget.dataset.id);
        console.log('a');
        fetch(`https://jsonplaceholder.typicode.com/albums/${currentId}/photos`)
        .then(res => res.json())
        .then(data => setPhotos(data))
        .catch((e) => console.log(e.message));
        setActiveAlbum(currentId);
    });

    const photoClickHandler = useCallback((e) => {
        const currentId = Number(e.currentTarget.dataset.id);
        setActivePhoto(currentId);
    });

    const backButtonClickHandler = useCallback((e) => {
        unsetActiveAlbum();
        unsetPhotos();
    });

    const bigPhotoClickHandler = useCallback((e) => {
        unsetActivePhoto();
    });
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch((e) => console.log(e.message));
    },[]);

    return (
        <div className="content__container">
        { activeAlbum 
            ? activePhoto 
                ? ( <PhotoDetails photo={activePhoto}/> )
                :( <AlbumDetails album={activeAlbum}/> )
            :  ( <>
                    <div className="content__title">
                    { albums.length 
                        ? <h2>Albums</h2>
                        :<h3>Something went wrong during getting content.</h3>
                    }    
                    </div>
                    <div className="content__list-container">
                        <ul className="content__list">
                            {[...albums, ...localAlbums].map(album => <ListItem title={album.title} id={album.id} key={album.id} onClick={albumClickHandler}/>)}
                        </ul>
                        <button className="content__add-element-button" onClick={() => addAlbum()}>Add Album</button>
                    </div> 
                </> )
        }
                    { activeAlbum
                    ? activePhoto 
                        ? <></>
                        :(<>
                            <button className="content__add-element-button" onClick={() => setOpen(true)}>Add Photo</button>
                            <AddPhotoForm isOpen={open} onClose={() => setOpen(false)}/>
                        </>) 
                    :(<>
                        <button className="content__add-element-button" onClick={() => setOpen(true)}>Add Album</button>
                        <AddAlbumForm  isOpen={open} onClose={() => setOpen(false)}/>
                    </>)}
                </>
               )
             }
             
             
    </div>)
            
}