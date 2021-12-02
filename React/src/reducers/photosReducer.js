import {photosActionTypes} from "../actionTypes/photosActionTypes";
const type = photosActionTypes;
const defaultState = {
    photos: [],
    activePhoto: null,
    localPhotos: [],
};

const photosReducer = (state = defaultState, action) => {
    switch (action.type) {
        case type.LOAD_PHOTOS_FROM_STORAGE:
            const sessionLocalPhotos =  JSON.parse(sessionStorage.getItem('localPhotos') || '[]');
            return {...state, localPhotos: [...state.localPhotos, ...sessionLocalPhotos]}
        case type.ADD_PHOTO:
            const newLocalPhotos = [...state.localPhotos, action.payload];
            sessionStorage.setItem('localPhotos', JSON.stringify(newLocalPhotos));
            return {...state, localPhotos: newLocalPhotos};
        case type.ADD_PHOTOS:
            return {...state, photos: [...state.photos, ...action.payload]};
        case type.SET_ACTIVE_PHOTO:
            return {...state, activePhoto: state.photos.find(photo => photo.id === Number(action.payload))};
        case type.UNSET_ACTIVE_PHOTO:
            return {...state, activePhoto: null};
        case type.SET_PHOTOS:
            return {...state, photos: [...action.payload.photos]};
        case type.UNSET_PHOTOS:
            return {...state, photos: []};
        default:
            return state;
    }
};

export default photosReducer;