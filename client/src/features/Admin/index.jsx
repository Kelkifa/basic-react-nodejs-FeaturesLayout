import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import DataBoard from './pages/DataBoard';
import NotFound from 'components/NotFound';
import React from 'react';

function Admin() {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={`${match.url}/databoard`} component={DataBoard}/>
                <Redirect to={`${match.url}/databoard`} />
                <Route component={NotFound}/>
            </Switch>
        </>
    );
}

export default Admin;