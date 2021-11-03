import {photosActionTypes} from "../actionTypes/photosActionTypes";
const type = photosActionTypes;
const defaultState = {
    photos: [],
    activePhoto: null,
    localPhotos: [],
};

const photosReducer = (state = defaultState, action) => {
    switch (action.type) {
        case type.ADD_PHOTO:
            return {...state, localPhotos: [...state.localPhotos, action.payload]};
        case type.ADD_PHOTOS:
            return {...state, photos: [...state.photos, ...action.payload]};
        case type.SET_ACTIVE_PHOTO:
            return {...state, activePhoto: state.photos.find(photo => photo.id === action.payload)};
        case type.UNSET_ACTIVE_PHOTO:
            return {...state, activePhoto: null};
        case type.SET_PHOTOS:
            const {photos, albumId} = action.payload;
            return {...state, photos: [...photos, ...state.localPhotos.filter(photo => photo.albumId === albumId)]};
        case type.UNSET_PHOTOS:
            return {...state, photos: []};
        default:
            return state;
    }
};

export default photosReducer;