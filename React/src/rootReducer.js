import { combineReducers } from "redux"
import albumsReducers from "./reducers/albumsReducer";
import photosReducer from "./reducers/photosReducer";
import usersReducers from "./reducers/usersReducer";

const rootReducer = combineReducers({
    users: usersReducers,
    albums: albumsReducers,
    photos: photosReducer,
})

export default rootReducer;