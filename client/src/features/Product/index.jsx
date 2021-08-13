import productApi from './productApi';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from '../../components/NotFound';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

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