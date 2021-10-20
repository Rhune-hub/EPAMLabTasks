import React, {useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'
import hardCodeAlbums from '../../data/hardCodeAlbums.json';
import hardCodePhotos from '../../data/hardCodePhotos.json';
import { useDispatch, useSelector } from 'react-redux';

export default function Content() {
    const dispatch = useDispatch();
    
    const localAlbums = useSelector(state => state.localAlbums);
    const localPhotos = useSelector(state => state.localPhotos);
    const albums = useSelector(state => state.albums);
    const photos = useSelector(state => state.photos);
    const activeAlbum = useSelector(state => state.activeAlbum);
    const activePhoto = useSelector(state => state.activePhoto);


    const addAlbum = () => {
        const album = hardCodeAlbums[hardCodeAlbums.length * Math.random() | 0];
        dispatch({type:'ADD_ALBUM', payload: {...album, id:albums.length+localAlbums.length+1}});
    }

    const addPhoto = () => {
        const photo = hardCodePhotos[hardCodePhotos.length * Math.random() | 0];
        dispatch({type:'ADD_PHOTO', payload: {...photo, id:photos.length+localPhotos.length+1, albumId: activeAlbum.id}});
    }

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
    
    const albumClickHandler = useCallback((e) => {        
        const currentId = Number(e.currentTarget.dataset.id);

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
            { albums.length === 0 
            ?  ( <div className="content__title">
                    <h3>Something went wrong during getting content.</h3>
                </div>)
            : (<>
                <div className="content__title">
                    <h2>Albums</h2>
                </div>
                <div className="content__list-container">
                    <ul className="content__list">
                        { activeAlbum 
                            ? activePhoto 
                                ? ( <div className="content__big-photo-container" onClick={bigPhotoClickHandler}>
                                        <h2 className="big-photo__title">Photos from album "{activePhoto.title}"</h2>
                                        <img className="big-photo__image" src={activePhoto.url} alt={`For ${activePhoto.title}`} onClick={bigPhotoClickHandler}/>
                                    </div>)
                                :(<>
                                    <ListItem title="Back" onClick={backButtonClickHandler} key={-1213}/>
                                    {[...photos,...localPhotos].map(photo => <ListItem title={photo.title} imgSrc={photo.thumbnailUrl} id={photo.id} key={photo.id} onClick={photoClickHandler}/>)}
                                    <ListItem title="Back" onClick={backButtonClickHandler} key={-2131}/>
                                    
                                </>)
                            :  [...albums, ...localAlbums].map(album => <ListItem title={album.title} id={album.id} key={album.id} onClick={albumClickHandler}/>)   
                        }
                    </ul>
                </div> 
                    { activeAlbum
                    ? activePhoto 
                        ? <></>
                        :(<button className="content__add-element-button" onClick={() => addPhoto()}>Add Photo</button>) 
                    :(<button className="content__add-element-button" onClick={() => addAlbum()}>Add Album</button>)}
                </>
               )
             }
    </div>)
}
