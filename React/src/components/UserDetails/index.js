import React, {useEffect, useCallback} from 'react'
import Avatar from '../Avatar'
import UserInfo from '../UserInfo'
import Content from '../Content'
import ErrorBoundary from '../ErrorBoundary'
import userObject from '../../data/user.json'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import AlbumDetails from '../AlbumDetails'


export default function UserDetails() {
    
    const user = useSelector(state => state.users.user);
    
    const {albumId} = useParams();

    return (    
        user
        ? (<div className="user-details__container" data-user-id={user.id}>
                <div className="user-details__info">
                    <Avatar src="/img/avatar.png"/>
                    <UserInfo user={user}/>
                </div>
                <div className="user-details__content">
                <ErrorBoundary>
                    {albumId ? <AlbumDetails/> : <Content userId={user.id}/>}
                </ErrorBoundary>
                </div>
        </div>)
        : <></>
    )
}
