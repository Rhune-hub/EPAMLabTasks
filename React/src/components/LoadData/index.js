import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useInRouterContext, useParams } from 'react-router';
import { setAllAlbums, setUserAlbums} from '../../actions/albumsActions';
import { setPhotos } from '../../actions/photosActions';

export default function LoadData({children}) {
    
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {userId, albumId} = useParams();


    const loadAlbums = useCallback(() => {
        if(userId) {
            fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(res => res.json())
            .then(data => dispatch(setUserAlbums(userId, data)))
            .catch((e) => console.log(e.message));
        } else {
            fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then(res => res.json())
            .then(data => dispatch(setAllAlbums(data)))
            .catch((e) => console.log(e.message));
        }
    }, [dispatch]);

    const loadPhotos = useCallback(() => {
        if (albumId) {
            fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then(res => res.json())
            .then(data => dispatch(setPhotos(albumId, data)))
            .catch((e) => console.log(e.message));
        }
    },[albumId,dispatch]);

    const loadStorageData = useCallback(() => {
        dispatch({type:'LOAD_USER_FROM_STORAGE'});
        dispatch({type:'LOAD_ALBUMS_FROM_STORAGE'});
        dispatch({type:'LOAD_PHOTOS_FROM_STORAGE'});
    },[dispatch]);

    useEffect(() => {
        loadAlbums();
        loadPhotos();
        loadStorageData();
    },[loadAlbums,loadPhotos,loadStorageData]);
    
    return children;
}
