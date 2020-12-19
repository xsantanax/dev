import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { loginUser, setAuthorizationHeader, signupUser } from '../redux/actions/userActions'

import firebase from 'firebase/app'
import FirebaseUIAuth from "react-firebaseui-localized";
import 'firebase/auth'

const styles = {
    loginWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        margin: 60,
        fontSize: 46,
        fontWeight: 300,
    },
    formWrap: {
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldComponent: {
        width: '100%',
    },
    button: {
        margin: 20,
        marginTop: 32,
        backgroundColor: '#202020',
        borderRadius: 0,
        width: 260,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    customError: {
        color: 'red',
        fontSize: 12,
        marginTop: 6,
    },
    pageFooter: {
        fontSize: 14,
        marginBottom: 10,
    },
    progress: {
        position: 'absolute',
    },
}

var uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        singInSuccess: () => false
    }
}

class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            copied: false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault() //prevent page reloading and url info exposing
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history) //history to be used on redirecting w/ history.push()
    }
    render() {
        const { classes, ui: { loading } } = this.props
        const { errors } = this.state

        return (
            <div className={classes.loginWrap}>
                <div className={classes.pageTitle}>
                    Entrar
                </div>
                <form noValidate onSubmit={this.handleSubmit} className={classes.formWrap}>
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textFieldComponent}
                        helperText={errors.email} error={errors.email ? true : false}
                        value={this.state.email} onChange={this.handleChange}
                    />
                    <TextField id="password" name="password" type="password" label="Senha" className={classes.textFieldComponent}
                        helperText={errors.password} error={errors.password ? true : false}
                        value={this.state.password} onChange={this.handleChange}
                    />
                    {errors.general && ( //returned by Firebase Auth if account doesnt exist
                        <div className={classes.customError}>
                            Conta inválida
                        </div>
                    )}
                    <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                        Entrar
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                </form>
                <Link className={classes.pageFooter} to="/signup">
                    Novo por aqui?  <b>Crie uma conta</b>
                </Link>

                <div style={{fontSize:14}}>ou</div>

                <FirebaseUIAuth
                    lang="pt_br"
                    config={uiConfig}
                    auth={firebase.auth()}
                    firebase={firebase}
                />

            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    ui: state.ui,
})
const mapActionsToProps = {
    loginUser,
    signupUser,
    setAuthorizationHeader,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
