import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';
import LoginForm from '../LoginForm';
import UserDetails from '../UserDetails';
import PhotoDetails from '../PhotoDetails';
import Logout from '../Logout';
import Albums from '../Albums';
import Home from '../Home';
import Layout from '../Layout';
import NotFound from '../NotFound';
import Auth from '../Auth';

const MyRouter = () => (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="albums" element={<Albums/>}>
          <Route path=":albumId" element={<AlbumDetails/>}>
            <Route path="photos/:photoId" element={<PhotoDetails/>}/>
          </Route>
        </Route>
        <Route path="user/:userId" element={<Auth redirect="/login"><UserDetails/></Auth>}>
          <Route path="albums/:albumId" element={<AlbumDetails/>}>
            <Route path="photos/:photoId" element={<PhotoDetails/>}/>
          </Route>
        </Route>
        <Route path="login" element={<Auth redirect={<LoginForm/>}><Navigate to="/"/></Auth>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route path="home" element={<Navigate to="/"/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
);

export default MyRouter;