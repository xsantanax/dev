const functions = require('firebase-functions');
const { admin, db } = require('../util/admin')

exports.getEvents = functions.https.onRequest((req, res) => {
    admin.firestore().collection('events')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let events = []
            data.forEach(doc => {
                events.push({
                    ...doc.data(),
                    eventId: doc.id,
                })
            })
            return res.json(events)
        })
        .catch(err => console.log(err))
})

exports.postEvent = functions.https.onRequest((req, res) => {

    const {
        eventTitle,
        eventDay,
        eventMonth,
        eventYear,
        eventStartHour,
        eventStartMinute,
        eventEndHour,
        eventEndMinute,
    } = req.body

    if (eventTitle.trim() === '') {
        return res.status(400).json({ eventTitle: 'Título vazio' })
    }
    if (eventDay.trim() === '' || eventDay < 1 || eventDay > 31) {
        return res.status(400).json({ eventDay: 'Dia inválido' })
    }
    if (eventMonth.trim() === '' || eventMonth < 1 || eventMonth > 12) {
        return res.status(400).json({ eventMonth: 'Mês inválido' })
    }
    if (eventYear.trim() === '' || eventYear < 2000) {
        return res.status(400).json({ eventYear: 'Ano inválido' })
    }

    if (eventStartHour.trim() === '' || eventStartHour < 0 || eventStartHour > 23) {
        return res.status(400).json({ eventTitle: 'Hora inválida' })
    }
    if (eventStartMinute.trim() === '' || eventStartMinute < 0 || eventStartMinute > 59) {
        return res.status(400).json({ eventTitle: 'Minuto inválido' })
    }
    if (eventEndHour.trim() === '' || eventEndHour < 0 || eventEndHour > 23) {
        return res.status(400).json({ eventTitle: 'Hora inválida' })
    }
    if (eventEndMinute.trim() === '' || eventEndMinute < 0 || eventEndMinute > 59) {
        return res.status(400).json({ eventTitle: 'Minuto inválido' })
    }

    let startHourConcat = eventStartHour < 10 ? ('0' + eventStartHour) : ('' + eventStartHour)
    let startMinuteConcat = eventStartMinute < 10 ? ('0' + eventStartMinute) : ('' + eventStartMinute)
    let endHourConcat = eventEndHour < 10 ? ('0' + eventEndHour) : ('' + eventEndHour)
    let endMinuteConcat = eventEndMinute < 10 ? ('0' + eventEndMinute) : ('' + eventEndMinute)

    let eventStartConcat = startHourConcat + startMinuteConcat
    let eventEndConcat = endHourConcat + endMinuteConcat


    if (eventEndConcat <= eventStartConcat) return res.status(400).json({ eventTitle: 'Horário Inválido' })


    admin.firestore().collection('events')
        .where('eventDay', '==', eventDay)
        .where('eventMonth', '==', eventMonth)
        .where('eventYear', '==', eventYear)
        .get()
        .then(data => {
            data.forEach(doc => {
                console.log(doc.data())
                if (
                    (eventStartConcat >= doc.data().eventStartConcat && eventStartConcat <= doc.data().eventEndConcat) ||
                    (eventEndConcat >= doc.data().eventStartConcat && eventEndConcat <= doc.data().eventEndConcat) ||
                    (eventStartConcat <= doc.data().eventStartConcat && eventEndConcat >= doc.data().eventEndConcat)
                ) {
                    return res.status(400).json({ eventTitle: 'Horário já reservado' })
                } else {
                    return
                }
            })
        })
        .catch(err => console.log(err))


    const newEvent = {
        ...req.body,
        createdAt: new Date().toISOString(),
        createdBy: req.user.name,
        creatorHandle: req.user.handle,
        eventStartConcat: eventStartConcat,
        eventEndConcat: eventEndConcat,
    }

    admin.firestore().collection('events')
        .add(newEvent)
        .then(doc => {
            resEvent = newEvent
            resEvent.eventId = doc.id
            res.json(resEvent)
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' })
        })
})

exports.deleteEvent = (req, res) => {
    console.log(req.params.eventId) //ok
    const document = db.doc(`/events/${req.params.eventId}`)
    document.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Event not found' })
            } else if (doc.data().creatorHandle !== req.user.handle) {
                return res.status(403).json({ error: 'Unauthorized' })
            } else {
                return document.delete()
            }
        })
        .then(() => {
            res.json({ message: 'Event deleted succesfully' })
        })
        .catch(err => {
            return res.status(500).json({ error: err.code })
        })
}