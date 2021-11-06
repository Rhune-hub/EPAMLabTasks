import { useEffect } from 'react';
import ReactDOM from "react-dom";   
import { Link, Route, Routes, Navigate, useParams, useNavigate} from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';
import LoginForm from '../LoginForm';
import UserDetails from '../UserDetails';
import PhotoDetails from '../PhotoDetails';
import Authorization from '../Authorization';
import Content from '../Content';
import Logout from '../Logout';
import { useSelector } from 'react-redux';

const MyRouter = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.users.user);
    const state = useSelector(state=>state);
    console.log(state);
    

    return (
        <Routes>
            <Route exact path="/" element={user ? (<Navigate to="/albums"/>) :(<Navigate to={`/user/${user?.id}`}/>)}/>

            <Route path="login" element={user ? (<Navigate to={`/user/${user.id}`}/>) : (<LoginForm/>)}/>

            <Route path="logout" element={<Logout/>}/>

            <Route path="albums" element={<Content/>}>
                <Route path=":albumId" element={<AlbumDetails/>}>
                    <Route path="photos/:photoId" element={<PhotoDetails/>}/>
                </Route>
            </Route>

            <Route path="/user/:userId" exist element={user ? (<UserDetails user={user}/>) : (<Navigate to="/login"/>)}/>
                <Route path="/user/:userId/albums/:albumId" element={user ? (<AlbumDetails/>) : (<Navigate to="/login"/>)}/>
            

            <Route path="home" element={<Navigate to="/"/>}/>

            <Route path="*" element={<>
                <h1>Page not found.</h1>
                {/* {setTimeout(() => navigate('/'),3000)} */}
            </>}/>
                
        </Routes>)
}

export default MyRouter;