import {
    LOADING_DATA,
    SET_EVENTS,
    POST_EVENT,
    DELETE_EVENT,
} from '../types'

const initialState = {
    loading: false,
    events: [],
}

let index

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            }
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false,
            }
        case POST_EVENT:
            return {
                ...state,
                events: [
                    action.payload,
                    ...state.events,
                ]
            }
        case DELETE_EVENT:
            index = state.events.findIndex((event) => event.eventId === action.payload)
            state.events.splice(index, 1)
            return {
                ...state,
                events: [
                    ...state.events,
                ],
            }
        default:
            return state
    }
}