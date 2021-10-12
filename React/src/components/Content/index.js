import React, {useState, useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'

export default function Content() {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [activePhoto, setActivePhoto] = useState(null);

    const albumClickHandler = useCallback((e) => {        
        const currentId = Number(e.currentTarget.dataset.id);

        fetch(`https://jsonplaceholder.typicode.com/albums/${currentId}/photos`)
        .then(res => res.json())
        .then(data => setPhotos(data))
        .catch((e) => console.log(e.message));
        
        setActiveAlbum(albums.find(album => album.id === currentId));
    });

    const photoClickHandler = useCallback((e) => {
        const currentId = Number(e.currentTarget.dataset.id);
        setActivePhoto(photos.find(photo => photo.id === currentId));
    });

    const backButtonClickHandler = useCallback((e) => {
        setActiveAlbum(null);
        setPhotos([]);
    });

    const bigPhotoClickHandler = useCallback((e) => {
        setActivePhoto(null);
    });
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(data => setAlbums(data))
            .catch((e) => console.log(e.message));
    },[]);

    return (
        <div className="content__container">
            { albums.length === 0 
            ?   <div className="content__title">
                    <h3>Something went wrong during getting content.</h3>
                </div>
            : ( <>
                <div className="content__title">
                    <h2>Albums</h2>
                </div>
                <div className="content__list-container">
                    <ul className="content__list">
                        { activeAlbum 
                            ? activePhoto 
                                ? ( <div className="content__big-photo-container" onClick={bigPhotoClickHandler}>
                                        <h2 className="big-photo__title">Photos from album "{activePhoto.title}"</h2>
                                        <img className="big-photo__image" src={activePhoto.url} alt={`For ${activePhoto.title}`} onClick={bigPhotoClickHandler}/>
                                    </div>)
                                :(<>
                                    <ListItem title="Back" onClick={backButtonClickHandler} key={-1213}/>
                                    {photos.map(photo => <ListItem title={photo.title} imgSrc={photo.thumbnailUrl} id={photo.id} key={photo.id} onClick={photoClickHandler}/>)}
                                    <ListItem title="Back" onClick={backButtonClickHandler} key={-2131}/>
                                </>)
                            :  albums.map(album => <ListItem title={album.title} id={album.id} key={album.id} onClick={albumClickHandler}/>) 
                        }
                    </ul>
                </div> 
                </>
                ) }
    </div>)
}
