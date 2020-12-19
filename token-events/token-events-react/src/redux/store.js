import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import eventReducer from './reducers/eventReducer'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

const reducers = combineReducers({
    user: userReducer,
    event: eventReducer,
    ui: uiReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store