import {createStore} from 'redux'

const defaultState = {
    user: null,
    albums: [],
    photos: [],
    activeAlbum: null,
    activePhoto: null,
    localAlbums: [],
    localPhotos: [],

};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ALBUM':
            const newAlbum = {...action.payload, id:state.albums.length+state.localAlbums.length+1};
            return {...state, localAlbums: [...state.localAlbums, newAlbum]};
        case 'ADD_PHOTO':
            const newPhoto = {...action.payload, id:state.photos.length+state.localPhotos.length+1};
            return {...state, localPhotos: [...state.localPhotos, newPhoto]};
        case 'SET_ACTIVE_ALBUM':
            return {...state, activeAlbum: [...state.albums,...state.localAlbums].find(album => album.id === action.payload)};
        case 'SET_ACTIVE_PHOTO':
            return {...state, activePhoto: [...state.photos,...state.localPhotos].find(photo => photo.id === action.payload)};
        case 'UNSET_ACTIVE_ALBUM':
            return {...state, activeAlbum: null};
        case 'UNSET_ACTIVE_PHOTO':
            return {...state, activePhoto: null};
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'SET_ALBUMS':
            return {...state, albums: [...action.payload, ...state.localAlbums]};
        case 'SET_PHOTOS':
            return {...state, photos: action.payload};
        case 'UNSET_PHOTOS':
            return {...state, photos: []};
        
        
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;