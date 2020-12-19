import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { postEvent, clearErrors } from '../redux/actions/eventActions'
import addIcon from '../images/add-white.png'
import { Link } from 'react-router-dom'

const styles = {
    icon: {
        minWidth: 32,
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#353535',
        borderRadius: 999,
        cursor: 'pointer',
        marginRight: 20,
    },
    postEventForm: {
        marginRight: 20,
        marginLeft: 20,
    },
    textField: {
        marginBottom: 10,
    },
    actionButtons: {
        marginBottom: 10,
        marginTop: 10,
    },
    confirmButton: {
        paddingRight: 20,
        paddingLeft: 20,
        float: 'right',
    },
    progressSpinner: {
        position: 'absolute',
    },
}

class PostEvent extends Component {
    state = {
        open: false,
        errors: {},
        eventTitle: '',
        eventDescription: '',
        eventDay: '',
        eventMonth: '',
        eventYear: '',
        eventStartHour: '',
        eventStartMinute: '',
        eventEndHour: '',
        eventEndMinute: '',
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
        //after loading, no errors? -> close and reset
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({
                open: false,
                errors: {},
                eventTitle: '',
                eventDescription: '',
                eventDay: '',
                eventMonth: '',
                eventYear: '',
                eventStartHour: '',
                eventStartMinute: '',
                eventEndHour: '',
                eventEndMinute: '',
            })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        //clearErrors() needed here to prevent showing previous error after new submit
        this.props.clearErrors()
        this.setState({ open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let newEvent = {
            eventTitle: this.state.eventTitle,
            eventDescription: this.state.eventDescription,
            eventDay: this.state.eventDay,
            eventMonth: this.state.eventMonth,
            eventYear: this.state.eventYear,
            eventStartHour: this.state.eventStartHour,
            eventStartMinute: this.state.eventStartMinute,
            eventEndHour: this.state.eventEndHour,
            eventEndMinute: this.state.eventEndMinute,
        }
        this.props.postEvent(newEvent)
    }
    render() {
        const { errors } = this.state
        const { classes, authenticated, ui: { loading } } = this.props

        let icon = authenticated ? (
            <div className={classes.icon} onClick={this.handleOpen} id="postEvent">
                <img src={addIcon} width={22} height={22} alt="" />
            </div>
        ) : (
                <Link className={classes.icon} to="/login" id="postEvent">
                    <img src={addIcon} width={22} height={22} alt="" />
                </Link>
            )


        return (
            <>
                {icon}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    PaperProps={{ style: { borderRadius: 0, maxWidth: 400, } }}
                >
                    <form onSubmit={this.handleSubmit} className={classes.postEventForm}>
                        <TextField
                            className={classes.textField}
                            name="eventTitle"
                            type="text"
                            label="Título"
                            placeholder="Qual o título do evento?"
                            error={errors.eventTitle ? true : false}
                            helperText={errors.eventTitle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            className={classes.textField}
                            name="eventDescription"
                            type="text"
                            label="Descrição"
                            placeholder="Conte mais sobre o evento"
                            onChange={this.handleChange}
                            fullWidth
                        />



                        <TextField
                            className={classes.textField}
                            name="eventDay"
                            type="number"
                            label="Dia"
                            placeholder="1-31"
                            error={errors.eventDay ? true : false}
                            helperText={errors.eventDay}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ width: 60, marginRight: 20, }}
                        />
                        <TextField
                            className={classes.textField}
                            name="eventMonth"
                            type="number"
                            label="Mês"
                            placeholder="1-12"
                            error={errors.eventMonth ? true : false}
                            helperText={errors.eventMonth}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ width: 60, marginRight: 20, }}

                        />
                        <TextField
                            className={classes.textField}
                            name="eventYear"
                            type="number"
                            label="Ano"
                            placeholder="20xx"
                            error={errors.eventYear ? true : false}
                            helperText={errors.eventYear}
                            onChange={this.handleChange}
                            fullWidth
                            style={{ width: 60, }}

                        />


                        <TextField
                            className={classes.textField}
                            name="eventStartHour"
                            type="number"
                            label="Hora de início"
                            placeholder="0-23h"
                            fullWidth
                            helperText={errors.eventStartHour}
                            onChange={this.handleChange}
                            style={{ width: 150, marginRight: 20, }}

                        />
                        <TextField
                            className={classes.textField}
                            name="eventStartMinute"
                            type="number"
                            label="Minuto de início"
                            placeholder="0-59min"
                            onChange={this.handleChange}
                            fullWidth
                            helperText={errors.eventStartMinute}
                            onChange={this.handleChange}
                            style={{ width: '40%', }}
                        />


                        <TextField
                            className={classes.textField}
                            name="eventEndHour"
                            type="number"
                            label="Hora de término"
                            placeholder="0-23h"
                            fullWidth
                            helperText={errors.eventEndHour}
                            onChange={this.handleChange}
                            style={{ width: '40%', marginRight: 20, }}

                        />
                        <TextField
                            className={classes.textField}
                            name="eventEndMinute"
                            type="number"
                            label="Minuto de término"
                            placeholder="0-59min"
                            fullWidth
                            helperText={errors.eventEndMinute}
                            onChange={this.handleChange}
                            style={{ width: '40%', }}
                        />


                        <div className={classes.actionButtons}>
                            <Button onClick={this.handleClose}>Fechar</Button>
                            <Button
                                ref={(el) => { this.scrollPoint = el; }}
                                type="submit"
                                className={classes.confirmButton}
                                disabled={loading}
                            >
                                Publicar
                                    {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = state => ({
    ui: state.ui,
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { postEvent, clearErrors })(withStyles(styles)(PostEvent))