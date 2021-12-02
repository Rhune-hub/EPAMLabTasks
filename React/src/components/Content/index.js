import React, {useEffect, useCallback} from 'react'
import ListItem from '../ListItem'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import AddAlbumForm from '../AddAlbumForm';
import PhotoDetails from '../PhotoDetails';
import AlbumDetails from '../AlbumDetails';
import { useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom'

export default function Content({children}) {
   

    return (
        <div className="content__container">
            {children}
                </div>)       
}
