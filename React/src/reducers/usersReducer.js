import {usersActionTypes} from "../actionTypes/usersActionTypes";
const type = usersActionTypes;
const defaultState = {
    user: undefined,
};

const usersReducers = (state = defaultState, action) => {
    switch (action.type) {
        case type.LOAD_USER_FROM_STORAGE:
            const sessionUser =  JSON.parse(sessionStorage.getItem('user')) || null;
            return {...state, user: sessionUser}
        case type.SET_USER:
            return {...state, user: action.payload};
        case type.UNSET_USER:
            sessionStorage.removeItem('user');
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducers;