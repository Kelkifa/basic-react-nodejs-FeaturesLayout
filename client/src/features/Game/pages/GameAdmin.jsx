import {Route, Switch, useRouteMatch} from "react-router-dom";

import GameList from "./GameList";
import NotFound from "components/NotFound";
import React from "react";

function GameAdmin(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route path={`${match.url}/table`} component={GameList} />
			<Route component={NotFound}></Route>
		</Switch>
	);
}

export default GameAdmin;
