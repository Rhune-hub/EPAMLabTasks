import React, {useEffect} from 'react'
import Avatar from '../Avatar'
import UserInfo from '../UserInfo'
import Content from '../Content'
import userObject from '../../data/user.json'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';


export default function UserDetails() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    
    const setUser = () => {
        dispatch({type:'SET_USER', payload: userObject})
    }

    useEffect(() => {
        setUser();
    }, [])
    
    return (
        user
        ? (<div className="user-details__container" data-user-id={user.id}>
                <div className="user-details__info">
                    <Avatar src={user.avatar}/>
                    <UserInfo user={user.info}/>
                </div>
                <div className="user-details__content">
                    <Content userId={user.id}/>
                </div>
        </div>)
        : <></>
    )
}
