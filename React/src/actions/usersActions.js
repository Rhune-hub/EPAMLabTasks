
import {usersActionTypes as types} from '../actionTypes/usersActionTypes';

export function setUser(user) {
    return {
        type: types.SET_USER,
        payload: user,
    }
}
export function unsetUser(user) {
    return {
        type: types.UNSET_USER,
        payload: undefined,
    }
}