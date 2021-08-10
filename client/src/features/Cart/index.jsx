import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CartPage from './pages/CartPage';
import NotFound from '../../components/NotFound';

Cart.propTypes = {
    
};

function Cart(props) {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={match.url} component={CartPage} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Cart;