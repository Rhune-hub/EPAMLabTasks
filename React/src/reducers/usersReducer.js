import {usersActionTypes} from "../actionTypes/usersActionTypes";
const type = usersActionTypes;
const defaultState = {
    user: null,
};

const usersReducers = (state = defaultState, action) => {
    switch (action.type) {
        case type.SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default usersReducers;