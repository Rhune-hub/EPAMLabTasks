import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { setUserAlbums, setAllAlbums, addAlbums } from "../../actions/albumsActions";
import AddAlbumForm from "../AddAlbumForm";
import ListItem from "../ListItem";
import { ALBUM_LIMIT } from '../../data/limits.json';
import ShowMoreButton from "../ShowMoreButton";

export default function Albums() {
    const albums = useSelector(state => state.albums.albums);
    const { userId } = useParams();
    const localAlbums = useSelector(state => userId ? state.albums.localAlbums.filter(album => album.userId = Number(userId)) : state.albums.localAlbums);
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();
  
    
    const url = `https://jsonplaceholder.typicode.com/${userId ? `users/${userId}/` : ''}albums`;
    useEffect(() => {
      if (userId)
        fetch(`${url}`)
                .then(res => res.json())
                .then(data => dispatch(setUserAlbums(userId, data)))
                .catch((e) => console.log(e.message));
      else
        fetch(`${url}?_limit=10`)
          .then(res => res.json())
          .then(data => dispatch(setAllAlbums(data)))
          .catch((e) => console.log(e.message));
  
    }, [dispatch, userId, url]);

    useEffect(() => {
    },[localAlbums]);

    if (!albums) return null;
    return (
      <div>
        <Outlet/>
        <div>
          <h3 className="album-detail__title">Albums</h3>
          <ul className="flex-list">
            {[...albums, ...localAlbums].map(album => (<ListItem key={album.id} to={`${userId ? `/user/${userId}` : ''}/albums/${album.id}`} title={album.title}/>))}
          </ul>
          { !userId && albums.length < ALBUM_LIMIT ? <ShowMoreButton addObjects={addAlbums} url={url} start={albums.length} count={10}/>  : <></>}
          { userId
          ? (<>
              <button className="album-detail__add-button" onClick={()=>setOpen(true)}>Add Album</button>
              <AddAlbumForm isOpen={isOpen} onClose={()=>setOpen(false)}/>
            </>)
          : <></>
          }
        </div>
      </div>
    )
  }