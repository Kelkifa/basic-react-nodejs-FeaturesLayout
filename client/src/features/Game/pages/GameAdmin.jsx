import React, {useEffect} from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import GameCreate from "./GameCreate";
import GameList from "./GameList";
import NotFound from "components/NotFound";
import {adminGet} from "../gameSlice";
import {useDispatch} from "react-redux";

function GameAdmin(props) {
	const dispatch = useDispatch();

	const match = useRouteMatch();

	useEffect(() => {
		const fetchGameList = async () => {
			try {
				const response = await dispatch(adminGet());
			} catch (err) {
				console.log(err);
			}
		};
		fetchGameList();
	}, []);
	return (
		<Switch>
			<Route path={`${match.url}/table`} component={GameList} />
			<Route path={`${match.url}/create`} component={GameCreate} />
			<Route exac path={match.url}>
				<Redirect to={`${match.url}/table`} />
			</Route>
			<Route component={NotFound}></Route>
		</Switch>
	);
}

export default GameAdmin;
