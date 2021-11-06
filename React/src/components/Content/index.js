import React, {useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import AddAlbumForm from '../AddAlbumForm';
import PhotoDetails from '../PhotoDetails';
import AlbumDetails from '../AlbumDetails';
import { useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom'

export default function Content() {
    const dispatch = useDispatch();

    const {pathname} = useLocation();
    const {userId, albumId} = useParams();
    const navigate = useNavigate();
    
    const localAlbums = useSelector(state => state.albums.localAlbums);
    const albums = useSelector(state => state.albums.albums);
    const activeAlbum = useSelector(state => state.albums.activeAlbum);
    const activePhoto = useSelector(state => state.photos.activePhoto);

    const [open, setOpen] = useState(false);


    const setUserAlbums = useCallback((albums, userId) => {
        dispatch({type:'SET_USER_ALBUMS', payload: {albums, userId}});
    }, [dispatch])

    const setAllAlbums = useCallback((albums) => {
        dispatch({type:'SET_ALL_ALBUMS', payload: albums});
    }, [dispatch])
    
    const setActiveAlbum = useCallback((albumId) => {
        dispatch({type:'SET_ACTIVE_ALBUM', payload: albumId});
    }, [dispatch])

    useEffect(() => {
        console.log(albumId)
        if (userId)
            fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                .then(res => res.json())
                .then(data => setUserAlbums(data, userId))
                .catch((e) => console.log(e.message));
        else
            fetch(`https://jsonplaceholder.typicode.com/albums`)
                .then(res => res.json())
                .then(data => {setAllAlbums(data);if(albumId)setActiveAlbum(albumId);})
                .catch((e) => console.log(e.message));

    },[]);
    
    useEffect(() => {
        if(albums && albumId) {
            setActiveAlbum(albumId);
            console.log(albums, localAlbums,albumId, activeAlbum, 'asdsad')
            //navigate(`/albums/${albumId}`);
        }
    },[])

    const albumClickHandler = useCallback((e) => {
        const currentId = Number(e.currentTarget.dataset.id);
        navigate(pathname+`/albums/${currentId}`);
        setActiveAlbum(currentId);
    },[setActiveAlbum, navigate]);

    return (
        <div className="content__container">
        { activeAlbum 
            ? activePhoto 
                ? ( <PhotoDetails photo={activePhoto}/> )
                :( <AlbumDetails album={activeAlbum} onCloseModal={() => setOpen(false)} onAddPhotoButtonClick={() => setOpen(true)}/> )
            :  ( <>
                    <div className="content__title">
                    { albums.length 
                        ? <h2>Albums</h2>
                        :<h3>Something went wrong during getting content.</h3>
                    }    
                    </div>
                    <div className="content__list-container">
                        <ul className="content__list">
                            {albums.map(album => <ListItem title={album.title} id={album.id} key={album.id} onClick={albumClickHandler}/>)}
                        </ul>
                        <button className="content__add-element-button" onClick={() => setOpen(true)}>Add Album</button>
                        <AddAlbumForm  isOpen={open} onClose={() => setOpen(false)}/>
                    </div> 
                </> )
        }
        </div>)       
}
