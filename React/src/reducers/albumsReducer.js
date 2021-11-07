import {albumsActionTypes} from "../actionTypes/albumsActionTypes";
const type = albumsActionTypes;
const defaultState = {
    albums: [],
    localAlbums: [],
    activeAlbum: null,
}

export default function albumsReducers (state = defaultState, action) {
    switch (action.type) {
        case type.LOAD_ALBUMS_FROM_STORAGE:
            const sessionLocalAlbums =  JSON.parse(sessionStorage.getItem('localAlbums')) || [];
            return {...state, localAlbums: [...state.localAlbums, ...sessionLocalAlbums]}
        case type.ADD_ALBUM:
            const newLocalAlbums =  [...state.localAlbums, action.payload];
            sessionStorage.setItem('localAlbums',JSON.stringify(newLocalAlbums));
            return {...state, localAlbums: newLocalAlbums};     
        case type.ADD_ALBUMS:
            return {...state, albums: [...state.albums, ...action.payload]};
        case type.SET_ACTIVE_ALBUM:
            console.log(action.payload, state.albums, state.activeAlbum)
            return {...state, activeAlbum: state.albums.find(album => album.id === Number(action.payload))};
        case type.UNSET_ACTIVE_ALBUM:
            return {...state, activeAlbum: null};
        case type.SET_ALL_ALBUMS:
            return {...state, albums: [...action.payload, ...state.localAlbums]};        
        case type.SET_USER_ALBUMS:
                const {albums, userId} = action.payload;
                return {...state, albums: [...albums, ...state.localAlbums.filter(album => album.userId === Number(userId))]};        
        default:
            return state;
    }
};