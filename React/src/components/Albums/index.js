import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { setUserAlbums, setAllAlbums, addAlbums } from "../../actions/albumsActions";
import AddAlbumForm from "../AddAlbumForm";
import ListItem from "../ListItem";
import ShowMoreButton from "../ShowMoreButton";

export default function Albums() {
    const albums = useSelector(state => state.albums.albums);
  
    const { userId } = useParams();
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
  
    }, [dispatch, userId, albums, url]);
  
    if (!albums) return null;
    return (
      <div>
        <Outlet/>
        <div>
          <ul>
            {albums.map(album => (<ListItem key={album.id} to={`${userId ? `/user/${userId}/` : ''}/albums/${album.id}`} title={album.title}/>))}
          </ul>
          { !userId ? <ShowMoreButton addObjects={addAlbums} url={url} start={albums.length} count={10}/>  : <></>}
          <button onClick={()=>setOpen(true)}>Add Album</button>
        <AddAlbumForm isOpen={isOpen} onClose={()=>setOpen(false)}/>
        </div>
      </div>
    )
  }