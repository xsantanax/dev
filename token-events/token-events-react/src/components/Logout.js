import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import logoutIcon from '../images/logout.png'
import { logoutUser } from '../redux/actions/userActions'

const styles = {
    wrap: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        cursor: 'pointer',
    },
    text: {
        color: '#aaa',
        paddingLeft: 16,
        fontSize: 14,
    },
    logoutIcon: {
        marginLeft: 3,
        marginRight: -3,
        opacity: 0.3,
    },
}

function Logout(props) {

    const {classes} = props
    const authenticated = useSelector(state => state.user.authenticated)
    const dispatch = useDispatch()
    
    let logout = (authenticated === true) ? (
        <div className={classes.wrap} onClick={() => dispatch(logoutUser())}>
            <img className={classes.logoutIcon} src={logoutIcon} height="21" alt="logout" />
            <div className={classes.text}>Sair</div>
        </div>
    ) : (
            null
        )
        
    return logout
}

Logout.propTypes = {
    classes:PropTypes.object.isRequired,
    authenticated:PropTypes.bool,
}

export default withStyles(styles)(Logout)
