import {Formik} from "formik";
import PropTypes from "prop-types";
import React from "react";

Test.propTypes = {};

function Test(props) {
	const handleSubmit = values => {
		console.log(values);
	};
	return (
		<Formik
			initialValues={{selectAllTest: [], selectedTests: []}}
			onSubmit={handleSubmit}
		>
			{formikProps => {
				const {
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue,
				} = formikProps;

				console.log(values);

				return (
					<form onSubmit={handleSubmit}>
						<div>
							<label>select all</label>
							<input
								name="selectAllTest"
								onChange={e => {
									handleChange(e);
									if (e.target.checked === true) {
										setFieldValue("selectedTests", ["item1", "item2"]);
										return;
									}
									setFieldValue("selectedTests", []);
								}}
								value="1"
								type="checkbox"
								checked={
									values.selectedTests.length === 2 ||
									values.selectAllTest[0] == "1"
										? true
										: false
								}
							/>
						</div>
						<div>
							<label>Item1</label>
							<input
								name="selectedTests"
								onChange={e => {
									handleChange(e);
									if (e.target.checked === false) {
										setFieldValue("selectAllTest", []);
									}
								}}
								value="item1"
								type="checkbox"
								checked={
									values.selectAllTest[0] === "1" ||
									values.selectedTests.findIndex(item => item === "item1") !==
										-1
										? true
										: false
								}
							/>
						</div>
						<div>
							<label>Item1</label>
							<input
								name="selectedTests"
								onChange={e => {
									handleChange(e);
									if (e.target.checked === false) {
										setFieldValue("selectAllTest", []);
									}
								}}
								value="item2"
								type="checkbox"
								checked={
									values.selectAllTest[0] === "1" ||
									values.selectedTests.findIndex(item => item === "item2") !==
										-1
										? true
										: false
								}
							/>
						</div>
						<button type="submit">Submit</button>
					</form>
				);
			}}
		</Formik>
	);
}

export default Test;
