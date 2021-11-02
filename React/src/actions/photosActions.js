import {photosActionTypes as types} from "../actionTypes/photosActionTypes"

export function setPhotos(photos) {
    return {
        type: types.SET_ALBUMS,
        payload: photos,
    }
}

export function addPhoto(photo) {
    return {
        type: types.ADD_ALBUM,
        payload: photo,
    }
}

export function unsetActivePhoto() {
    return {
        type: types.UNSET_ACTIVE_ALBUM,
        payload: null,
    }
}

export function setActivePhoto(photo) {
    return {
        type: types.SET_ACTIVE_ALBUM,
        payload: photo,
    }
}
