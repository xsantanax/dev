import {
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
} from '../types'

const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    allUsers: [],
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        default:
            return state
    }
}