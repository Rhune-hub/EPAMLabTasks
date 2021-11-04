import {albumsActionTypes} from "../actionTypes/albumsActionTypes";
const type = albumsActionTypes;
const defaultState = {
    albums: [],
    localAlbums: [],
    activeAlbum: null,
}

export default function albumsReducers (state = defaultState, action) {
    switch (action.type) {
        case type.ADD_ALBUM:
            console.log(state.localAlbums)
            return {...state, localAlbums: [...state.localAlbums, action.payload]};     
        case type.SET_ACTIVE_ALBUM:
            return {...state, activeAlbum: state.albums.find(album => album.id === action.payload)};
        case type.UNSET_ACTIVE_ALBUM:
            return {...state, activeAlbum: null};
        case type.SET_ALBUMS:
            const {albums, userId} = action.payload;
            console.log(albums, userId, state.localAlbums)
            return {...state, albums: [...albums, ...state.localAlbums.filter(album => album.userId === userId)]};        
        default:
            return state;
    }
};