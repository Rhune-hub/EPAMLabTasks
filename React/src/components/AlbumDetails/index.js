import React, {useCallback, useEffect, useState} from 'react'
import ListItem from '../ListItem';
import ShowMoreButton from '../ShowMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoForm from '../AddPhotoForm';
import {PHOTO_LIMIT} from '../../data/photoLimit.json';
import './style.css'

export default function AlbumDetails({album}) {
    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos.photos);
    const localPhotos = useSelector(state => state.photos.localPhotos);

    const [open, setOpen] = useState(false);

    const setPhotos = useCallback((albumId, photos) => {
        dispatch({type:'SET_PHOTOS', payload: {albumId, photos}});
    }, [dispatch]);

    const setActivePhoto = useCallback((photoId) => {
        dispatch({type:'SET_ACTIVE_PHOTO', payload: photoId});
    }, [dispatch]);

    const unsetActiveAlbum = useCallback(() => {
        dispatch({type:'UNSET_ACTIVE_ALBUM'});
    }, [dispatch]);

    const unsetPhotos = useCallback(() => {
        dispatch({type:'UNSET_PHOTOS'});
    }, [dispatch]);

    const albumDetailBackHandler = useCallback((e) => {
        unsetActiveAlbum();
        unsetPhotos();
    }, [unsetActiveAlbum, unsetPhotos]);

    const photoClickHandler = useCallback((e) => {
        const currentId = Number(e.currentTarget.dataset.id);
        setActivePhoto(currentId);
    }, [setActivePhoto]);

    useEffect(() => {   
        fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=10`)
        .then(res => res.json())
        .then(data => setPhotos(album.id, data))
        .catch((e) => console.log(e.message));
        
    }, [setPhotos, localPhotos, album]);
    
    if (!album) return null;
    return (
        <div className="album-detail">
            <div className="album-detail__title"><h2>{album.title}</h2></div>
            {photos.length
            ? <>
            <ul className="content__list">
                {photos.length > 15 ? <ListItem title="Back" onClick={albumDetailBackHandler}/> : <></>}
                {photos.map(photo => <ListItem title={photo.title} imgSrc={photo.thumbnailUrl} id={photo.id} key={photo.id} onClick={photoClickHandler}/>)}
                <ListItem title="Back" onClick={albumDetailBackHandler}/>
            </ul>
                { photos.length < PHOTO_LIMIT ? <ShowMoreButton albumId={album.id} start={photos.length} count={10}/> : <></>}
            </>
            : <><div className="album-detail__empty"><h3>Album is empty</h3></div><div className="album-detail__back-button-container"><button className="album-detail__back-button" onClick={albumDetailBackHandler}>Back</button></div></>}
                <div className="album-detail__add-button-container"><button className="album-detail__add-button" onClick={()=>setOpen(true)}>Add Photo</button></div>
                <AddPhotoForm isOpen={open} onClose={()=>setOpen(false)}/>
        </div>
    )
}
