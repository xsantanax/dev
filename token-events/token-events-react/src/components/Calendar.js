import { useSelector } from 'react-redux'
import Event from './Event'
import CircularProgress from '@material-ui/core/CircularProgress'


const flexDiv = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

function Calendar() {
    const events = useSelector(state => state.event.events)
    const loading = useSelector(state => state.event.loading)
    let eventsMarkup = !loading ? (
        events.map((event) => <Event key={event.eventId} event={event} />)
    ) : (
            <div style={flexDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>
        )
    return eventsMarkup
}

export default Calendar

