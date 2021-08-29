import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import AdminProduct from "features/Product/pages/AdminProduct";
import DataBoard from "./pages/DataBoard";
import GameAdmin from "features/Game/pages/GameAdmin";
import GameCreate from "./pages/GameCreate";
import NotFound from "components/NotFound";
import React from "react";

function Admin() {
	const match = useRouteMatch();
	return (
		<>
			<Switch>
				<Route path={`${match.url}/databoard`} component={DataBoard} />

				<Route path={`${match.url}/products`}>
					<AdminProduct></AdminProduct>
				</Route>

				<Route path={`${match.url}/games`}>
					<GameAdmin></GameAdmin>
				</Route>

				<Route path={match.url}>
					<Redirect to={`${match.url}/databoard`} />
				</Route>

				<Route component={NotFound} />
			</Switch>
		</>
	);
}

export default Admin;
