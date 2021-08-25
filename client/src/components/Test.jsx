import React from "react";
import Select from "react-select";

function Test(props) {
	return (
		<div>
			<form action="">
				<Select
					name="a"
					className="select"
					options={[
						{value: "1", label: "Tien ich"},
						{value: "2", label: "Mo hinh"},
					]}
				/>
			</form>
		</div>
	);
}

export default Test;
