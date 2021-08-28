import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import AdminProduct from "features/Product/pages/AdminProduct";
import DataBoard from "./pages/DataBoard";
import GameCreate from "./pages/GameCreate";
import NotFound from "components/NotFound";
import ProductCreate from "./pages/ProductCreate";
import ProductTable from "./pages/ProductTable";
import ProductTrash from "./pages/ProductTrash";
import React from "react";

function Admin() {
	const match = useRouteMatch();
	return (
		<>
			<Switch>
				<Route path={`${match.url}/databoard`} component={DataBoard} />

				{/* <Route path={`${match.url}/products/table`} component={ProductTable} />
				<Route
					path={`${match.url}/products/create`}
					component={ProductCreate}
				/>
				<Route path={`${match.url}/products/trash`} component={ProductTrash} /> */}
				<Route path={`${match.url}/products`}>
					<AdminProduct></AdminProduct>
				</Route>

				<Route path={`${match.url}/games/create`} component={GameCreate} />

				<Route path={match.url}>
					<Redirect to={`${match.url}/databoard`} />
				</Route>

				<Route component={NotFound} />
			</Switch>
		</>
	);
}

export default Admin;
