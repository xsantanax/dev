import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
// import editIcon from '../images/edit.png'
import DeleteEvent from './DeleteEvent'
import { useSelector } from 'react-redux'


const styles = {
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginBottom: 20,
        padding: 20,
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 12,
    },
    eventDay: {
        display: 'flex',
        width: '100%',
        marginBottom: 8,
    },
    timeRange: {
        display: 'flex',
        marginBottom: 8,
    },
    startTime: {
        display: 'flex',
        marginRight: 40,
    },
    endTime: {
        display: 'flex',
    },
    bold: {
        fontSize: 14,
        fontWeight: 500,
    },
    thin: {
        fontSize: 13,
        marginTop: 1,
        marginLeft: 6,
    },
    createdBy: {
        display: 'flex',
    },
    description: {
        padding: 10,
        backgroundColor: '#F4F8FF',
        fontSize: 13,
        marginTop: 16,

    },
}

function Event(props) {
    const { classes, event } = props
    const userHandle = useSelector(state => state.user.credentials.handle)

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <div className={classes.title}>{event.eventTitle}</div>
                <div>
                    {
                        userHandle === event.creatorHandle ? (
                            <>
                                <DeleteEvent eventId={event.eventId} />
                                {/* <img src={editIcon} width={18} height={18} style={{ marginLeft: 15, }} /> */}
                            </>
                        ) : (
                                null
                            )
                    }

                </div>
            </div>
            <div className={classes.eventDay}>
                <div className={classes.bold}>Dia:</div>
                <div className={classes.thin}>{event.eventDay}/{event.eventMonth}/{event.eventYear}</div>
            </div>
            <div className={classes.timeRange}>
                <div className={classes.startTime}>
                    <div className={classes.bold}>Início:</div>
                    <div className={classes.thin}>{event.eventStartHour}:{event.eventStartMinute}</div>
                </div>
                <div className={classes.endTime}>
                    <div className={classes.bold}>Fim:</div>
                    <div className={classes.thin}>{event.eventEndHour}:{event.eventEndMinute}</div>
                </div>
            </div>
            <div className={classes.createdBy}>
                <div className={classes.bold}>Criado por: </div>
                <div className={classes.thin}>{event.createdBy}</div>
            </div>
            {
                event.eventDescription ? (
                    <div className={classes.description}>{event.eventDescription}</div>
                ) : null
            }
        </div>
    )
}

export default withStyles(styles)(Event)
