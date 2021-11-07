import React, {useEffect, useState} from 'react'
import ListItem from '../ListItem';
import ShowMoreButton from '../ShowMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoForm from '../AddPhotoForm';
import {PHOTO_LIMIT} from '../../data/limits.json';
import { useParams, Link, Outlet } from 'react-router-dom'
import './style.css'    

import { addPhotos, setPhotos } from '../../actions/photosActions';

export default function AlbumDetails() {
    const dispatch = useDispatch();
    const {albumId, userId} = useParams();
    const [isOpen, setOpen] = useState(false);
    const album = useSelector(state => state.albums.albums.find(album => album.id === Number(albumId)));

    const photos = useSelector(state => state.photos.photos);
    const localPhotos = useSelector(state => state.photos.localPhotos.filter(photo => photo.albumId === Number(albumId)));
    const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
    useEffect(() => {
        fetch(`${url}?_limit=10`)
              .then(res => res.json())
              .then(data => dispatch(setPhotos(albumId,data)))
              .catch((e) => console.log(e.message));
    }, [dispatch, albumId, url]);

    useEffect(() => {},[localPhotos])
    if(!album) return null;
    return (
      <div className="album-detail">
        <Outlet/>
        <h2 className="album-detail__title">Album {album.title}</h2>
        <div>
        <ul className="flex-list">
          {[...photos,...localPhotos].map(photo => (<ListItem key={photo.id} imgSrc={photo.thumbnailUrl} to={`${userId ? `/user/${userId}` : ''}/albums/${albumId}/photos/${photo.id}`} title={photo.title}/>))}
        </ul>
        { photos.length < PHOTO_LIMIT ? <ShowMoreButton url={url} addObjects={addPhotos} start={photos.length} count={10}/> : <></>}
        { userId 
        ? (<>
            <button className="album-detail__add-button" onClick={()=>setOpen(true)}>Add Photo</button>
            <AddPhotoForm isOpen={isOpen} onClose={()=>setOpen(false)}/>
          </>)
        : <></>}
        <Link className="back-button" to={-1}>Back</Link>
      </div>
      </div>
    )
}
