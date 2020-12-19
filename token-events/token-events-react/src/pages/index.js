import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Calendar from '../components/Calendar'


class index extends Component {
    render() {
        const { authenticated } = this.props
        return authenticated ? <Calendar /> : <Redirect to="/login" />
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(index)