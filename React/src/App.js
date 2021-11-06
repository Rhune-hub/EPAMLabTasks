import './styles/App.css';
import UserDetails from './components/UserDetails';
import ScrollButton from './components/ScrollButton';
import MyRouter from './components/router/Router';
import AuthButton from './components/AuthButton';
import LoadData from './components/LoadData';

import {Link, Routes, Route, Navigate, Outlet, useParams, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAllAlbums, setUserAlbums, addAlbums} from './actions/albumsActions';
import { addPhotos, setPhotos} from './actions/photosActions';
import { setUser} from './actions/usersActions';
import ListItem from './components/ListItem';
import ShowMoreButton from './components/ShowMoreButton';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import UserInfo from './components/UserInfo';

function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('user'));
    dispatch(setUser(userSession));
  },[dispatch]);

  return (
    <div className="header">
      <nav>
        <ul>
          <strong>Test Links </strong>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/albums/1">Album 1</Link>
          </li>
          <li>
            <Link to="/albums/3/photos/105">Album 3 Photo 105</Link>
          </li>
          <li>
            {user ? <Link to={`/user/${user.id}`}>Current User</Link> : <span>Current User</span> }
          </li>
          <li>
            {user ? <Link to={`/user/${user.id}/albums/2`}>Current User Album 2</Link> : <span>Current User</span> }
          </li>
          <li>
            {user ? <Link to={`/user/${user.id}/albums/3/photos/106`}>Current User Album 3 Photo 106</Link> : <span>Current User</span> }
          </li>
          <li>
            { user
            ? <Link to="/logout">Logout</Link>
            : <Link to="/login">Login</Link>
            }
          </li>
        </ul>
        <Link to={-1}>Back</Link>
      </nav>
      <Outlet/>
      <ScrollButton direction="bottom"/>
      <ScrollButton direction="top"/>
    </div>
    
  )
}

function Albums() {
  const albums = useSelector(state => state.albums.albums);

  const { userId } = useParams();

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

  }, [dispatch, userId]);

  if (!albums) return null;
  return (
    <div>
      <Outlet/>
      <div>
        <ul>
          {albums.map(album => (<ListItem key={album.id} to={`${userId ? `user/${userId}/` : ''}/albums/${album.id}`} title={album.title}/>))}
        </ul>
        { !userId ? <ShowMoreButton addObjects={addAlbums} url={url} start={albums.length} count={10}/>  : <></>}
      </div>
    </div>
  )
}

function Album() {
  const dispatch = useDispatch();

  const {albumId, userId} = useParams();
  const album = useSelector(state => state.albums.albums.find(album => album.id === Number(albumId)));
  const photos = useSelector(state => state.photos.photos);
  const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
  useEffect(() => {
    fetch(`${url}?_limit=10`)
            .then(res => res.json())
            .then(data => dispatch(setPhotos(albumId,data)))
            .catch((e) => console.log(e.message));
  }, [dispatch, albumId]);
  if(!album) return null;
  return (
    <div>
      {(<Outlet/>).props.children ? <h1>{console.log((<Outlet/>).props)}</h1> : <h1>{console.log((<Outlet/>).props)}</h1> }
      <Outlet/>
      <h2>{album.title}</h2>
      <div>
      <ul>
        {photos.map(photo => (<ListItem key={photo.id} to={`${userId ? `user/${userId}/` : ''}/albums/${albumId}/photos/${photo.id}`} title={photo.title}/>))}
      </ul>
      <ShowMoreButton url={url} addObjects={addPhotos} start={photos.length} count={10}/>
    </div>
    <h1>Other Albums</h1>
    </div>
  )
}

function User() {
  const user = useSelector(state => state.users.user);
  const {userId} = useParams();
  const navigate = useNavigate();

  if(user && userId === user.id) navigate(`/users/${user.id}`)
  console.log(user);
  if (!user) return null;
  return (
    <div>
      <UserInfo user={user}/>
      <Outlet/>
    </div>

  )
}

function Home() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.users.user);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    dispatch(setUser(user));
  })

  if (user === undefined) return null;
  return user
    ? <Navigate to={`/user/${user.id}`}/>
    : <Navigate to="/albums"/>
  
}

function Photo() {
  const {albumId, photoId} = useParams();

  const photo = useSelector(state => state.photos.photos.find(photo => photo.id === Number(photoId)));
  
  if (!photo) return null;
  return (
    <div>
      <h2>{photo.title}</h2>
      <img src={photo.url} alt=""/>
    </div>
  )
}

function Auth({redirect, children}) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? children : typeof redirect === 'string' ? <Navigate to={redirect}/> : redirect;
}

function App({children}) {
  const state = useSelector(state => state);
  console.log(state.users.user,state)
  return (
    <div className="app">
    
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="albums" element={<Albums/>}>
          <Route path=":albumId" element={<Album/>}>
            <Route path="photos/:photoId" element={<Photo/>}/>
          </Route>
        </Route>
        <Route path="user/:userId" element={<Auth redirect="/login"><User/></Auth>}>
          <Route index element={<Albums/>}/>
          <Route path="albums/:albumId" element={<Album/>}>
            <Route path="photos/:photoId" element={<Photo/>}/>
          </Route>
        </Route>
        <Route path="login" element={<Auth redirect={<LoginForm/>}><Navigate to="/"/></Auth>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route path="home" element={<Navigate to="/"/>}/>
      </Route>
    </Routes>


      {/* <LoadData> */}
      {children}
      
      {/* </LoadData> */}
      
    </div>
  );
}

export default App;
