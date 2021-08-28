import "./showImagesField.scss";

import PropTypes from "prop-types";
import React from "react";

ShowImagesField.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,

	imgs: PropTypes.string,
};

ShowImagesField.defaultProps = {
	className: "",
	label: null,
	imgs: null,
};

function ShowImagesField(props) {
	const {className, label, imgs} = props;
	const imgArray = imgs ? imgs.split("\n") : [];
	// console.log("[SHOW]", imgArray[imgArray.length - 1]);
	// const imgList = imgArray.map(value => {
	// 	if (value !== "") return value;
	// });

	return (
		<div className={`${className} admin-show-image-field`}>
			<label>{label}</label>
			<ul className="admin-show-image-field__group custom-scroll">
				{imgArray.map((img, index) => {
					if (!img) return "";
					return (
						<li
							key={img + index}
							className="admin-show-image-field__group__item"
						>
							<img src={img} alt="fail" />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ShowImagesField;
