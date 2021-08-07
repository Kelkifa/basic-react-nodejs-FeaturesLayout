import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

Product.propTypes = {
    
};

function Product (props) {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.url} component={Home}/>
            <Route path={`${match.url}home`} component={Home}/>
            <Route path={`${match.url}:id/detail`} component={Detail} />
        </Switch>
    );
}

export default Product;