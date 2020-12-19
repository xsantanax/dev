const app = require('express')()
const functions = require('firebase-functions')
//initializeApp (needed for firebase serve) is being called inside admin, which is imported in FBAuth
const FBAuth = require('./util/fbAuth')

const { getEvents, postEvent, deleteEvent } = require('./handlers/events')
const { signup, getAuthenticatedUser, login } = require('./handlers/users')

app.post('/login', login)
app.get('/events', getEvents)
app.post('/event', FBAuth, postEvent)
app.post('/signup', signup)
app.get('/user', FBAuth, getAuthenticatedUser)
app.delete('/event/:eventId', FBAuth, deleteEvent)

exports.api = functions.https.onRequest(app)