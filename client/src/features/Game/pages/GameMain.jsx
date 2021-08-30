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
				{gameInfo.data.map(value => (
					<div key={value._id} className="game-main__img-container__img">
						{value.type === "image" ? (
							<img src={value.data} alt="err" />
						) : (
							<iframe
								width="350"
								height="196"
								src={`https://www.youtube.com/embed/${value.data}`}
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default GameMain;
