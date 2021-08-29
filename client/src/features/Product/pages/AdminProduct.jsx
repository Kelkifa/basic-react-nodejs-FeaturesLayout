import React, {useEffect} from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import NotFound from "components/NotFound";
import ProductCreate from "./ProductCreate";
import ProductList from "./ProductList";
import ProductTrash from "./ProductTrash";
import {adminGetAll} from "../productSlice";
import {useDispatch} from "react-redux";

AdminProduct.propTypes = {};

function AdminProduct(props) {
	const dispatch = useDispatch();
	const match = useRouteMatch();

	useEffect(() => {
		const fetchGetAll = async () => {
			try {
				const response = await dispatch(adminGetAll());
				return;
			} catch (err) {
				console.log(err);
			}
		};

		fetchGetAll();
	}, []);
	return (
		<Switch>
			<Route path={`${match.url}/table`} component={ProductList} />
			<Route path={`${match.url}/trash`} component={ProductTrash} />
			<Route path={`${match.url}/create`} component={ProductCreate} />
			<Route exac path={match.url}>
				<Redirect to={`${match.url}/table`} />
			</Route>
			<Route component={NotFound} />
		</Switch>
	);
}

export default AdminProduct;
