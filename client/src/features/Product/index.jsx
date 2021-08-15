import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Detail from './pages/Detail';
import Home from './pages/Home';
import NotFound from 'components/NotFound';
import React from 'react';

Product.propTypes = {
    
};

function Product (props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={Home}/>
            <Route path={`${match.url}home`} component={Home}/>
            <Route path={`${match.url}:id/detail`} component={Detail} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Product;