import { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

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
        marginBottom: 80,
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
    },
    progress: {
        position: 'absolute',
    },
}

class signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
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
        event.preventDefault()
        this.setState({ loading: true })
        const newUserData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }
        this.props.signupUser(newUserData, this.props.history)
    }
    render() {
        const { classes, ui: { loading } } = this.props
        const { errors } = this.state
        return (
            <div className={classes.loginWrap}>
                <div className={classes.pageTitle}>
                    Criar conta
                </div>
                <form noValidate onSubmit={this.handleSubmit} className={classes.formWrap}>
                    <TextField id="name" name="name" type="name" label="Nome" className={classes.textFieldComponent}
                        helperText={errors.name} error={errors.name ? true : false}
                        value={this.state.name} onChange={this.handleChange}
                    />
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textFieldComponent}
                        helperText={errors.email} error={errors.email ? true : false}
                        value={this.state.email} onChange={this.handleChange}
                    />
                    <TextField id="password" name="password" type="password" label="Senha" className={classes.textFieldComponent}
                        helperText={errors.password} error={errors.password ? true : false}
                        value={this.state.password} onChange={this.handleChange}
                    />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirmar senha" className={classes.textFieldComponent}
                        helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} onChange={this.handleChange}
                    />
                    {errors.general && (
                        <div className={classes.customError}>
                            Algo deu errado
                        </div>
                    )}
                    <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                        Criar conta
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                </form>
                <Link className={classes.pageFooter} to="/login">
                    Já possui uma conta?  <b>Entrar</b>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup))
