import React from 'react';

import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/Singin';
import SignUp from '../pages/SingUp';

const Routes: React.FC = () => {
    return (
        <Switch>
            < Route exact path="/" component={SignIn} />
            < Route path="/SignUp" component={SignUp} />
        </Switch>
    );
}

export default Routes;