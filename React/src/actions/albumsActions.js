import {albumsActionTypes as types} from "../actionTypes/albumsActionTypes"

export function setUserAlbums(userId, albums) {
    return {
        type: types.SET_USER_ALBUMS,
        payload: {userId, albums},
    }
}

export function setAllAlbums(albums) {
    return {
        type: types.SET_ALL_ALBUMS,
        payload: albums,
    }
}

export function addAlbum(album) {
    return {
        type: types.ADD_ALBUM,
        payload: album,
    }
}

export function addAlbums(albums) {
    return {
        type: types.ADD_ALBUMS,
        payload: albums,
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
