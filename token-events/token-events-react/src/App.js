import { useEffect } from 'react'
import store from './redux/store'
import { getEvents } from './redux/actions/eventActions'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Logout from './components/Logout'
import Logo from './components/Logo'
import PostEvent from './components/PostEvent'
import Content from './components/Content'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import { setAuthListener, handleToken } from './appFunctions'


// to switch between firebase deploy/serve -> edit proxy in package.json
// "proxy": "http://localhost:5000/token-events/us-central1/api"
// "proxy": "https://us-central1-token-events.cloudfunctions.net/api"
// then re-run npm start

//needed on top level for facebook login
//must be outside App(), or reloading will break app
firebase.initializeApp({
    apiKey: "AIzaSyCoqyKXVfedNSubKoj2-_8n3-wfcQ4o8ZM",
    authDomain: "token-events.firebaseapp.com",
})

function App() {

    useEffect(() => setAuthListener(), [])
    useEffect(() => handleToken(), [])
    useEffect(() => store.dispatch(getEvents()), [])

    return (
        <Provider store={store} >
            <BrowserRouter>
                <div className="navbar">
                    <div className="leftNavbar">
                        <Logo />
                    </div>
                    <div className="rightNavbar">
                        <PostEvent />
                        <Logout/>
                    </div>
                </div>
                <div className="body">
                    <div className="content"><Content /></div>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App