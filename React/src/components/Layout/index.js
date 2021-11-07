
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { loadStorageAlbums } from '../../actions/albumsActions';
import { loadStoragePhotos } from '../../actions/photosActions';
import { setUser } from '../../actions/usersActions';
import ScrollButton from './../ScrollButton/index';
import './style.css';

export default function Layout() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
  
    useEffect(() => {
        const userSession = JSON.parse(sessionStorage.getItem('user'));
        dispatch(loadStorageAlbums());
        dispatch(loadStoragePhotos());
        dispatch(setUser(userSession));
    }, [dispatch]);
    return ( <>
        <div className="header">
                    <strong className="title">Test Links </strong>
            <nav>
                <ul className="flex-list">
                    <li className="flex-list__element">
                        <Link className="list-element__content" to="/">Home</Link>
                    </li>
                    <li className="flex-list__element">
                        <Link className="list-element__content" to="/albums">Albums</Link>
                    </li>
                    <li className="flex-list__element">
                        <Link  className="list-element__content" to="/albums/1">Album 1</Link>
                    </li>
                    <li className="flex-list__element">
                        <Link  className="list-element__content" to="/albums/3/photos/105">Album 3 Photo 105</Link>
                    </li>
                    <li className="flex-list__element">
                        <Link  className="list-element__content" to={`/user/1`}>User 1</Link>
                    </li>
                    <li className="flex-list__element">
                        {user ? <Link  className="list-element__content" to={`/user/${user.id}`}>Current User</Link> : <span>Current User</span>}
                    </li>
                    <li className="flex-list__element">
                        {user ? <Link className="list-element__content"  to={`/user/${user.id}/albums/2`}>Current User Album 2</Link> : <span>Current User User Album 2</span>}
                    </li>
                    <li className="flex-list__element">
                        {user ? <Link  className="list-element__content" to={`/user/${user.id}/albums/3/photos/106`}>Current User Album 3 Photo 106</Link> : <span>Current User Album 3 Photo 106</span>}
                    </li>
                    <li className="flex-list__element">
                        {user
                            ? <Link className="list-element__content"  to="/logout">Logout</Link>
                            : <Link className="list-element__content"  to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
        </div>
            <div className="content">
            <Outlet />
            <ScrollButton direction="bottom" />
            <ScrollButton direction="top" />
        </div>
        </>
    )
}