import React, {useEffect} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import NotFound from "components/NotFound";
import ProductList from "./ProductList";
import ProductTrash from "./ProductTrash";
import PropTypes from "prop-types";
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
				console.log(response);
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

			<Route component={NotFound} />
		</Switch>
	);
}

export default AdminProduct;
