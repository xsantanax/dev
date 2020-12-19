import {
    LOADING_USER,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_USER,
    SET_UNAUTHENTICATED,
} from '../types'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'


export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
    return false
}
export const getAuthenticatedUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const signupUser = (newUserData, history) => (dispatch) => {
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getAuthenticatedUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getAuthenticatedUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
export const logoutUser = () => (dispatch) => {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('FBIdToken')
            delete axios.defaults.headers.common['Authorization']
            dispatch({ type: SET_UNAUTHENTICATED })
            window.location.href = "/"
        })
        .catch(err => console.log(err))
}


export const registerUserIfNew = (user) => dispatch => {
    axios.get(`user/${user.email}/email`) //checks if email exists
        .then(res => {
            if (res.data === false) {
                //email doesnt exist, need to signup user
                console.log('email doesnt exist')
                dispatch(googleFacebookSignup(user))
                return 
            }
        })
}

export const googleFacebookSignup = (user) => (dispatch) => {
    console.log('imhere')
    axios.post('/googleFacebookSignup', user)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getAuthenticatedUserData())
            window.location = '/'
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })}