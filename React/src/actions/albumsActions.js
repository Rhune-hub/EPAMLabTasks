import {albumsActionTypes} from "../actionTypes/albumsActionTypes"
const types = albumsActionTypes;

export function setAlbums(albums) {
    return {
        type: types.SET_ALBUMS,
        payload: albums,
    }
}

export function addAlbum(album) {
    return {
        type: types.ADD_ALBUM,
        payload: album,
    }
}

export function unsetActiveAlbum() {
    return {
        type: types.UNSET_ACTIVE_ALBUM,
        payload: null,
    }
}

export function setActiveAlbum(album) {
    return {
        type: types.SET_ACTIVE_ALBUM,
        payload: album,
    }
}
