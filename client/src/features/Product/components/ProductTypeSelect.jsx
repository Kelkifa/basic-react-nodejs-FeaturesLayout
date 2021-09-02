import "./productTypeSelect.scss";

import React, {useState} from "react";

import {FaRegCheckCircle} from "react-icons/fa";
import PropTypes from "prop-types";

ProductTypeSelect.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	name: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	type: PropTypes.string,
	remainProducts: PropTypes.number,

	valueChange: PropTypes.func,
};

ProductTypeSelect.defaultProps = {
	name: null,
	label: null,
	options: [],
	type: "select", //select or number
	remainProducts: 100,

	valueChange: null,
};

function ProductTypeSelect(props) {
	// PROPS
	const {form, field, name, label, options, type, remainProducts, valueChange} =
		props;

	// STATES
	const [active, setActive] = useState(false); //index of selected item

	const [soLuongValue, setSoLuongvalue] = useState(0);

	// FUNCTION HANDLER
	// const clickHandler = (value, index) => {
	// 	setActive(index);

	// 	const action = {
	// 		name,
	// 		payload: value,
	// 	};
	// 	valueChange(action);
	// };
	const changeHandler = e => {
		const action = {
			name,
			payload: e.target.value,
		};
		valueChange(action);
		setSoLuongvalue(e.target.value);
	};

	// RENDER
	return (
		<div className="detail__right__select__group">
			<div className="detail__right__select__group__label">
				<div className="detail__right__select__group__label__text">{label}</div>
			</div>
			{type === "select" && (
				<ul className="detail__right__select__group__options">
					{options.map((option, index) => (
						<li
							className={
								field.value === option.name
									? "detail__right__select__group__options__item detail__right__select__group__options__item--active"
									: "detail__right__select__group__options__item"
							}
							key={option.name}
							onClick={() => {
								field.onChange({
									target: {name: field.name, value: option.name},
								});
							}}
							onMouseUp={field.onBlur}
							// onMouseOver={()=>{if(mouseOverOptions) mouseOverOptions(option.image)}}
						>
							{option.name}

							{field.value === option.name && (
								<FaRegCheckCircle className="detail__right__select__group__options__item__icon" />
							)}
						</li>
					))}
				</ul>
			)}
			{type === "number" && (
				<div className="detail__right__select__group__options">
					<input
						name={field.name}
						type={type}
						className="detail__right__select__group__options__input"
						type="number"
						onChange={field.onChange}
						onBlur={field.onBlur}
						max="100"
						min="1"
						value={field.value}
					/>
					<div className="detail__right__select__group__options__available">
						{remainProducts} sản phẩm còn lại
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductTypeSelect;
