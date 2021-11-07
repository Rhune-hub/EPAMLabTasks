import React, {useEffect, useState} from 'react'
import ListItem from '../ListItem';
import ShowMoreButton from '../ShowMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoForm from '../AddPhotoForm';
import {PHOTO_LIMIT} from '../../data/photoLimit.json';
import { useParams, Link, Outlet } from 'react-router-dom'
import './style.css'    
import { addPhotos, setPhotos } from 'actions/photosActions';

export default function AlbumDetails() {
    const dispatch = useDispatch();
    const {albumId, userId} = useParams();
    const [isOpen, setOpen] = useState(false);
    const album = useSelector(state => state.albums.albums.find(album => album.id === Number(albumId)));
    const photos = useSelector(state => state.photos.photos);
    const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
    useEffect(() => {
      fetch(`${url}?_limit=10`)
              .then(res => res.json())
              .then(data => dispatch(setPhotos(albumId,data)))
              .catch((e) => console.log(e.message));
    }, [dispatch, albumId, url, photos]);
    if(!album) return null;
    return (
      <div>
        <Outlet/>
        <h2>{album.title}</h2>
        <div>
        <ul>
          {photos.map(photo => (<ListItem key={photo.id} to={`${userId ? `/user/${userId}/` : ''}/albums/${albumId}/photos/${photo.id}`} title={photo.title}/>))}
        </ul>
        { photos.length < PHOTO_LIMIT ? <ShowMoreButton url={url} addObjects={addPhotos} start={photos.length} count={10}/> : <></>}
        <button onClick={()=>setOpen(true)}>Add Photo</button>
        <AddPhotoForm isOpen={isOpen} onClose={()=>setOpen(false)}/>
        <Link to={-1}>Back</Link>
      </div>
      </div>
    )
}
