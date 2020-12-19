import { Route, Switch } from 'react-router-dom'
import index from '../pages/index'
import login from '../pages/login'
import signup from '../pages/signup'
import AuthRoute from './AuthRoute'

function Content() {
    return (
        <Switch>
            <Route exact path="/" component={index} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
        </Switch>
    )
}

export default Content