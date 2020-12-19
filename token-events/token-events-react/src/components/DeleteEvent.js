import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import deleteIcon from '../images/delete.png'
import { connect } from 'react-redux'
import { deleteEvent } from '../redux/actions/eventActions'

class DeleteEvent extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    deleteEvent = () => {
        this.props.deleteEvent(this.props.eventId)
        this.setState({ open: false })
    }
    render() {
        return (
            <Fragment>
                <Button onClick={this.handleOpen}>
                    <img src={deleteIcon} width={20} height={20} />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>Você deseja deletar esse evento?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={this.deleteEvent}>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteEvent.propTypes = {
    deleteEvent: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
}

export default connect(null, { deleteEvent })(DeleteEvent)
