import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import CartPage from "./pages/CartPage";
import NotFound from "components/NotFound";
import React from "react";
import {useSelector} from "react-redux";

Cart.propTypes = {};

function Cart(props) {
	const uid = useSelector(state => state.user.data.uid);
	console.log("[uid]", uid);
	const match = useRouteMatch();

	return (
		<Switch>
			{!uid && <Redirect to="/auth/login" />}
			<Route path={match.url} component={CartPage} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default Cart;
