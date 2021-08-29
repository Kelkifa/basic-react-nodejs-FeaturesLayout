import "./gameMain.scss";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

GameMain.propTypes = {};

function GameMain(props) {
	const gameInfo = useSelector(state => state.games.user);
	console.log("[GAME INFO]", gameInfo);

	if (gameInfo.loading) {
		return <div>Loading...</div>;
	}
	if (gameInfo.error) {
		return <div>{gameInfo.error}</div>;
	}

	return (
		<div className="game-main">
			<h3>Bờ lay tu ghe đờ</h3>
			<div className="game-main__img-container">
				{gameInfo.data.map(data => (
					<div key={data._id} className="game-main__img-container__img">
						<img src={data.img} alt="err" />
					</div>
				))}
			</div>
		</div>
	);
}

export default GameMain;
