import {photosActionTypes as types} from "../actionTypes/photosActionTypes"

export function setPhotos(albumId,photos) {
    return {
        type: types.SET_PHOTOS,
        payload: {albumId,photos},
    }
}

export function addPhotos(photos) {
    return {
        type: types.ADD_PHOTOS,
        payload: photos,
    }
}

export function addPhoto(photo) {
    return {
        type: types.ADD_PHOTO,
        payload: photo,
    }
}

export function unsetActivePhoto() {
    return {
        type: types.UNSET_ACTIVE_PHOTO,
        payload: null,
    }
}

export function setActivePhoto(photo) {
    return {
        type: types.SET_ACTIVE_PHOTO,
        payload: photo,
    }
}

export function loadStoragePhotos() {
    return {
        type: types.LOAD_PHOTOS_FROM_STORAGE,
    }
}