
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { loadStorageAlbums } from '../../actions/albumsActions';
import { loadStoragePhotos } from '../../actions/photosActions';
import { setUser } from '../../actions/usersActions';
import ScrollButton from './../ScrollButton/index';

export default function Layout() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    useEffect(() => {
        const userSession = JSON.parse(sessionStorage.getItem('user'));
        dispatch(loadStorageAlbums());
        dispatch(loadStoragePhotos());
        dispatch(setUser(userSession));
    }, [dispatch]);

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
                        {user ? <Link to={`/user/${user.id}`}>Current User</Link> : <span>Current User</span>}
                    </li>
                    <li>
                        {user ? <Link to={`/user/${user.id}/albums/2`}>Current User Album 2</Link> : <span>Current User</span>}
                    </li>
                    <li>
                        {user ? <Link to={`/user/${user.id}/albums/3/photos/106`}>Current User Album 3 Photo 106</Link> : <span>Current User</span>}
                    </li>
                    <li>
                        {user
                            ? <Link to="/logout">Logout</Link>
                            : <Link to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
            <Outlet />
            <ScrollButton direction="bottom" />
            <ScrollButton direction="top" />
        </div>

    )
}