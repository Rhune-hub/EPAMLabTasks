import React, {useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'
import hardCodeAlbums from '../../data/hardCodeAlbums.json';
import { useDispatch, useSelector } from 'react-redux';
import PhotoDetails from '../PhotoDetails';
import AlbumDetails from '../AlbumDetails';

export default function Content({userId}) {
    const dispatch = useDispatch();
    
    const localAlbums = useSelector(state => state.albums.localAlbums);
    const albums = useSelector(state => state.albums.albums);
    const activeAlbum = useSelector(state => state.albums.activeAlbum);
    const activePhoto = useSelector(state => state.photos.activePhoto);

    const addAlbum = useCallback(() => {
        const album = hardCodeAlbums[hardCodeAlbums.length * Math.random() | 0];
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
        </div>)
}
