import "./inputField.scss";

import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

InputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeHolder: PropTypes.string,
	type: PropTypes.string,
	inputEle: PropTypes.string,
	className: PropTypes.string,
	options: PropTypes.object,
};

InputField.defaultProps = {
	label: null,
	placeHolder: null,
	type: "text",
	inputEle: null,
	className: "",
	options: {},
};

const customStyles = {
	control: (provided, state) => ({
		...provided,
		marginTop: "8px",
		minHeight: "38px",
		height: "38px",
		boxShadow: "1px 1px 4px rgba(99, 120, 165, 0.5)",
		"&:hover": {
			borderColor: "#2684ff",
		},
	}),

	valueContainer: (provided, state) => ({
		...provided,
		height: "38px",
		padding: "0 6px",
	}),

	input: (provided, state) => ({
		...provided,
		margin: "0px",
	}),
	indicatorSeparator: state => ({
		display: "none",
	}),
	indicatorsContainer: (provided, state) => ({
		...provided,
		height: "38px",
	}),
};

function InputField(props) {
	const {form, field, label, placeholder, inputEle, type, options, className} =
		props;

	const fieldError = form.errors[field.name];
	const fieldTouched = form.touched[field.name];

	// RENDER
	let inputField = (
		<input
			className={
				fieldError && fieldTouched
					? "input-field__input input-field__input--error"
					: "input-field__input"
			}
			name={field.name}
			value={field.value}
			onChange={field.onChange}
			onBlur={field.onBlur}
			type={type}
			placeholder={placeholder}
		/>
	);

	if (inputEle === "textarea")
		inputField = (
			<textarea
				className={
					fieldError && fieldTouched
						? "input-field__input input-field__input--error"
						: "input-field__input"
				}
				rows="3"
				name={field.name}
				value={field.value}
				onChange={field.onChange}
				onBlur={field.onBlur}
				type={type}
				placeholder={placeholder}
			></textarea>
		);
	if (inputEle === "select") {
		inputField = <Select styles={customStyles} options={options}></Select>;
	}

	return (
		<div className={`${className} input-field`}>
			<label htmlFor={field.name}>{label}</label>
			{inputField}
		</div>
	);
}

export default InputField;
