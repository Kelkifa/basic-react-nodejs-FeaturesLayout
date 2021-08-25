import "./inputField.scss";

import PropTypes from "prop-types";
import React from "react";

InputField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeHolder: PropTypes.string,
	type: PropTypes.string,
	inputEle: PropTypes.string,
	className: PropTypes.string,
};

InputField.defaultProps = {
	label: null,
	placeHolder: null,
	type: "text",
	inputEle: null,
	className: "",
};

function InputField(props) {
	const {form, field, label, placeholder, inputEle, type, className} = props;

	const fieldError = form.errors[field.name];
	const fieldTouched = form.touched[field.name];

	return (
		<div className={`${className} input-field`}>
			<label htmlFor={field.name}>{label}</label>
			{inputEle !== "textarea" ? (
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
			) : (
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
			)}
			{fieldError && fieldTouched && (
				<div className="input-field__error custom-text--dange">
					{fieldError}
				</div>
			)}
		</div>
	);
}

export default InputField;
