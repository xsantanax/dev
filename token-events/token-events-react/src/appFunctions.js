import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getAuthenticatedUserData, setAuthorizationHeader, registerUserIfNew } from './redux/actions/userActions'
import jwtDecode from 'jwt-decode'
import store from './redux/store'


export function setAuthListener() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) { //user logged in                
            store.dispatch(registerUserIfNew(user))
            user.getIdToken().then((accessToken) => {
                return setAuthorizationHeader(accessToken)
            }).catch(err => console.log(err))
        } else return
    })
}

export function handleToken() {
    const token = localStorage.FBIdToken
    console.log(token)
    if (token && token !== 'Bearer undefined') {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            store.dispatch(logoutUser())
            // window.location.href = '/login'
        } else {
            store.dispatch({ type: SET_AUTHENTICATED })
            //axios headers are deleted on page refresh, need to assign auth again
            axios.defaults.headers.common['Authorization'] = token
            store.dispatch(getAuthenticatedUserData())
        }
    }
}