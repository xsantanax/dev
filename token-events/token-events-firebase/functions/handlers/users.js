const firebase = require('firebase')
const firebaseConfig = require('../util/config')
const { admin, db } = require('../util/admin')
const { validateSignupData, validateLoginData } = require('../util/validators')

//needed for firebase auth
firebase.initializeApp(firebaseConfig)

exports.signup = (req, res) => {

    console.log('server')

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.name.trim() + `${Math.round(Math.random() * 1000000000000)}`,
        createdAt: new Date().toISOString(),
    }

    //Validate Data - "Client"
    const { valid, errors } = validateSignupData(newUser)
    if (!valid) return res.status(400).json(errors)

    console.log('data validated on client')

    //Validate Data - Server
    let token, userId
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' })
            } else {
                //email verification is done automatically by firebase auth
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            console.log(data)
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                userId: userId,
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                name: newUser.name,
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token: token })
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: "Email já está sendo usado." });
            } else {
                console.log(err)
                return res
                    .status(500)
                    .json({ general: "Something went wrong, please try again" });
            }
        })
}

exports.getAuthenticatedUser = (req, res) => {
    let userData = {}
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = { ...doc.data(), savedNews: [] }
                return res.json(userData)
            }
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    //Validate Data - Client
    const { valid, errors } = validateLoginData(user)
    if (!valid) return res.status(400).json(errors)

    //Validate Data - Server
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.json({ token })
        })
        .catch(() => {
            return res.status(403).json({ general: 'Wrong credentials' })
        })
}



exports.isEmailInFirestore = (req, res) => {
    db.collection('users')
        .where('email', '==', req.params.email)
        .get()
        .then(data => {
            // console.log(data)
            if (data._size !== 0) { console.log('email exists'); return res.json(true); }
            else { console.log('email doesnt exist'); return res.json(false); }
        })
}

exports.googleFacebookSignup = (req, res) => {
    const newUser = {
        email: req.body.email,
        userId: req.body.uid,
        name: req.body.displayName,
        image: req.body.photoURL + '?height=500',
        handle: req.body.displayName.trim() + `${Math.round(Math.random() * 1000000000000)}`,
    }

    db.doc(`/users/${newUser.handle}`).set(newUser)
        .then(() => {
            return res.status(201).json({ token: req.body.stsTokenManager.accessToken })
        })
        .catch(err => console.log(err))
}