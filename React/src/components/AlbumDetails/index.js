import React, {useCallback, useEffect} from 'react'
import ListItem from '../ListItem';
import ShowMoreButton from '../ShowMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import hardCodePhotos from '../../data/hardCodePhotos.json';
import {PHOTO_LIMIT} from '../../data/photoLimit.json';
import './style.css'

export default function AlbumDetails({album, onBack}) {
    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos.photos);
    const localPhotos = useSelector(state => state.photos.localPhotos);

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

    const addPhoto = useCallback((photo) => {
        dispatch({type:'ADD_PHOTO', payload: photo});
    }, [dispatch]);

    const addNewPhoto = useCallback(() => {
        const photo = hardCodePhotos[hardCodePhotos.length * Math.random() | 0];

        fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(photo)
          })
          .then(res => res.json())
          .then(({id}) => {
            addPhoto({...photo, id: id+localPhotos.length, albumId: album.id});
          })
          .catch((e) => console.log(e.message));
    }, [album, localPhotos, addPhoto])

    useEffect(() => {   
        fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=10`)
        .then(res => res.json())
        .then(data => setPhotos(album.id, data))
        .catch((e) => console.log(e.message));
        
    }, [setPhotos, localPhotos, album]);
    console.log(album,localPhotos)
    if (!album) return null;
    return (
        <div className="album-detail">
            <div className="album-detail__title"><span>{album.title}</span></div>
            {photos.length
            ? <>
            <ul className="content__list">
                {photos.length > 15 ? <ListItem title="Back" onClick={albumDetailBackHandler}/> : <></>}
                {photos.map(photo => <ListItem title={photo.title} imgSrc={photo.thumbnailUrl} id={photo.id} key={photo.id} onClick={photoClickHandler}/>)}
                <ListItem title="Back" onClick={albumDetailBackHandler}/>
            </ul>
                { photos.length < PHOTO_LIMIT ? <ShowMoreButton albumId={album.id} start={photos.length} count={10}/> : <></>}
            </>
            : <></>}
                <div className="album-detail__add-button-container"><button className="album-detail__add-button" onClick={addNewPhoto}>Add Photo</button></div>
        </div>
    )
}
