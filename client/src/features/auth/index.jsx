import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import NotFound from 'components/NotFound';
import PropTypes from 'prop-types';
import React from 'react';

Auth.propTypes = {
    
};

function Auth(props) {
    const match = useRouteMatch();
    
    return (
        <Switch>
            <Route path={`${match.url}/login`} component={LoginPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Auth;