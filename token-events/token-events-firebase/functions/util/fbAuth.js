const {admin, db} = require('./admin')

module.exports = (req, res, next) => {
    let idToken
    //check if token exists
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        console.error('No token found')
        return res.status(403).json({ error: 'Unauthorized'})
    }
    //check if token is correct
    admin
        .auth()

        .verifyIdToken(idToken)

        .then(decodedToken => {

            req.user = decodedToken //decodedToken = user data
            return db
                .collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then(data => {
            req.user.image = data.docs[0].data().image
            req.user.name = data.docs[0].data().name
            req.user.handle = data.docs[0].data().handle
            return next()
        })
        .catch(err => {
            console.error('Error while verifying token ', err)
            return res.status(403).json(err)
        })
}