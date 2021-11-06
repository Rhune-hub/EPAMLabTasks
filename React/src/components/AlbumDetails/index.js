import React, {useCallback, useEffect, useState} from 'react'
import ListItem from '../ListItem';
import ShowMoreButton from '../ShowMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoForm from '../AddPhotoForm';
import {PHOTO_LIMIT} from '../../data/photoLimit.json';
import { useRouteMatch, useParams, Route, useNavigate } from 'react-router-dom'
import './style.css'    

export default function AlbumDetails() {
    const dispatch = useDispatch();
    console.log('asdsdddddddddddddd')
    const navigate = useNavigate();
    const {albumId} = useParams();

    const activeAlbum = useSelector(state => state.albums.activeAlbum); 
    const photos = useSelector(state => state.photos.photos);
    const localPhotos = useSelector(state => state.photos.localPhotos);


    const [open, setOpen] = useState(false);

    const setPhotos = useCallback((albumId, photos) => {
        dispatch({type:'SET_PHOTOS', payload: {albumId, photos}});
    }, [dispatch]);

    // const setActivePhoto = useCallback((photoId) => {
    //     dispatch({type:'SET_ACTIVE_PHOTO', payload: photoId});
    // }, [dispatch]);

    
    // const unsetActiveAlbum = useCallback(() => {
    //     dispatch({type:'UNSET_ACTIVE_ALBUM'});
    // }, [dispatch]);

    // const unsetPhotos = useCallback(() => {
    //     dispatch({type:'UNSET_PHOTOS'});
    // }, [dispatch]);

    const albumDetailBackHandler = useCallback((e) => {
       // unsetActiveAlbum();
       // unsetPhotos();
        navigate(-1);
    }, []);

    const photoClickHandler = useCallback((e) => {
        const currentId = Number(e.currentTarget.dataset.id);
        navigate(`/albums/${albumId}/photos/${currentId}`);
       // setActivePhoto(currentId);
    }, [navigate]);

    useEffect(() => {   

        // fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        // .then(res => res.json())
        // .then(data => setActiveAlbum(albumD);)
        // .catch((e) => console.log(e.message));
        

        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=10`)
        .then(res => res.json())
        .then(data => setPhotos(albumId, data))
        .catch((e) => console.log(e.message));
        

    }, [setPhotos, localPhotos, albumId]);
    
    console.log(albumId,activeAlbum)
    if (!activeAlbum) return null;
    return (
        <div className="album-detail">
            <div className="album-detail__title"><h2>{activeAlbum.title}</h2></div>
            {photos.length
            ? <>
            <ul className="content__list">
                {photos.length > 15 ? <ListItem title="Back" onClick={albumDetailBackHandler}/> : <></>}
                {photos.map(photo => <ListItem title={photo.title} imgSrc={photo.thumbnailUrl} id={photo.id} key={photo.id} onClick={photoClickHandler}/>)}
                <ListItem title="Back" onClick={albumDetailBackHandler}/>
            </ul>
                { photos.length < PHOTO_LIMIT ? <ShowMoreButton albumId={activeAlbum.id} start={photos.length} count={10}/> : <></>}
            </>
            : <><div className="album-detail__empty"><h3>Album is empty</h3></div><div className="album-detail__back-button-container"><button className="album-detail__back-button" onClick={albumDetailBackHandler}>Back</button></div></>}
                <div className="album-detail__add-button-container"><button className="album-detail__add-button" onClick={()=>setOpen(true)}>Add Photo</button></div>
                <AddPhotoForm isOpen={open} onClose={()=>setOpen(false)}/>
        </div>
    )
}
