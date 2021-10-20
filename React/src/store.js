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
            return {...state, localAlbums: [...state.localAlbums, action.payload]};
        case 'ADD_PHOTO':
            return {...state, localPhotos: [...state.localPhotos, action.payload]};
        case 'SET_ACTIVE_ALBUM':
            return {...state, activeAlbum: state.albums.find(album => album.id === action.payload)};
        case 'SET_ACTIVE_PHOTO':
            return {...state, activePhoto: state.photos.find(photo => photo.id === action.payload)};
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