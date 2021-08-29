import "./gameList.scss";

import AdminTable from "features/Admin/components/AdminTable";
import React from "react";
import {gameAdminDelete} from "../gameSlice";
import {useSelector} from "react-redux";

function GameList(props) {
	const gameInfo = useSelector(state => state.games.admin.list);
	const tableHeaders = [
		"indedx",
		"Id",
		"Image",
		"Image address",
		"CreatedAt",
		"Options",
	];
	const gameIds = gameInfo.data.map(value => value._id);

	const handleDelete = data => {
		return gameAdminDelete({data});
	};
	return (
		<AdminTable
			tableHeaders={tableHeaders}
			header={{title: "Game List", content: "Danh sách hình ảnh game"}}
			idList={gameIds}
			pageType="list"
			dataInfo={{
				loading: gameInfo.loading,
				error: gameInfo.error,
				process: gameInfo.process,
			}}
			adminHandleDelete={handleDelete}
		>
			{gameInfo.data.map((game, index) => (
				<tr dataId={game._id} key={game._id}>
					<td>{index + 1}</td>
					<td>{game._id}</td>
					<td>
						<div className="game-list__img">
							<img src={game.img} alt="fail" />
						</div>
					</td>
					<td>{game.img}</td>
					<td>{game.createdAt}</td>
					<td>
						<div className="custom-link">Update</div>
						<div className="custom-link">Delete</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default GameList;
