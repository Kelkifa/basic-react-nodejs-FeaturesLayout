import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import DataBoard from './pages/DataBoard';
import NotFound from 'components/NotFound';
import ProductTable from './pages/ProductTable';
import React from 'react';

function Admin() {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={`${match.url}/databoard`} component={DataBoard}/>
                {/* <Redirect to={`${match.url}/databoard`} /> */}
                <Route path={`${match.url}/products/table`} component={ProductTable} />
                <Route component={NotFound}/>
            </Switch>
        </>
    );
}

export default Admin;