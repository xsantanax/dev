import {
    LOADING_DATA,
    SET_EVENTS,
    POST_EVENT,
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    DELETE_EVENT,
} from '../types'
import axios from 'axios'

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}

export const getEvents = () => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get('/events')
        .then(res => {
            dispatch({
                type: SET_EVENTS,
                payload: res.data,
            })
        })
        .catch(() => {
            dispatch({
                type: SET_EVENTS,
                payload: [],
            })
        })
}
export const postEvent = (newEvent) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.post('/event', newEvent)
        .then(res => {
            dispatch({
                type: POST_EVENT,
                payload: res.data,
            })
            dispatch(clearErrors())
            return res
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            })
        })
}
export const deleteEvent = (eventId) => dispatch => {
    axios.delete(`/event/${eventId}`)
        .then(() => {
            dispatch({
                type: DELETE_EVENT,
                payload: eventId,
            })
        })
        .catch(err => console.log(err))
}