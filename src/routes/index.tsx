import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './RouteAuth'

import SignIn from '../pages/Singin';
import SignUp from '../pages/SingUp';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '../pages/Dashboard';

//import em App.tsx
const Routes: React.FC = () => {
    return (
        <Switch>
            < Route exact path="/" component={SignIn} />
            < Route path="/signup" component={SignUp} />
            < Route path="/forgot-password" component={ForgotPassword} />

            < Route path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    );
}

export default Routes;