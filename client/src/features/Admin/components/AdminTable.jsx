import {Formik} from "formik";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import {useDispatch} from "react-redux";

AdminTable.propTypes = {
	tableHeaders: PropTypes.array,
	header: PropTypes.object,
	idList: PropTypes.array,

	adminHandleSubmit: PropTypes.func,
};
AdminTable.defaultProps = {
	tableHeaders: [],
	header: {title: "", content: ""},
	idList: [],

	adminHandleSubmit: null,
};

function AdminTable(props) {
	const dispatch = useDispatch();
	// PROPS
	const {children, tableHeaders, header, idList, adminHandleSubmit} = props;

	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		if (!adminHandleSubmit) return;
		try {
			// console.log(values.selectedInputs);
			// console.log(adminHandleSubmit);
			const response = await dispatch(adminHandleSubmit(values.selectedInputs));
			console.log("[RESPONSE]", response);
		} catch (err) {
			console.log(err);
		}
	};

	// RENDER
	return (
		<div className="admin-list">
			<div className="admin-list__notifice admin-layout-fluid">avx</div>

			<div className="admin-list__content admin-layout-fluid">
				<Formik
					onSubmit={handleSubmit}
					initialValues={{selectAllInput: [], selectedInputs: []}}
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

						return (
							<form onSubmit={handleSubmit}>
								<div className="admin-list__content__header">
									<h2 className="admin-list__header__text">{header.title}</h2>
									<p className="admin-list__header__info">{header.content}</p>
									<div>
										<button type="submit" className="custom-link">
											Xoá
										</button>
										<span> ({values.selectedInputs.length})</span>
									</div>
								</div>
								<div className="admin-list__content__table">
									<Table
										headerList={[
											<input
												value={1}
												type="checkbox"
												name="selectAllInput"
												onChange={e => {
													handleChange(e);
													if (e.target.checked === true) {
														setFieldValue("selectedInputs", idList);
														return;
													}
													setFieldValue("selectedInputs", []);
												}}
												checked={
													values.selectedInputs.length === 2 ||
													values.selectAllInput[0] == "1"
														? true
														: false
												}
											/>,
											...tableHeaders,
										]}
									>
										{children &&
											children({handleChange, setFieldValue}).map(value => {
												const dataId = value.props.dataId;

												return (
													<tr key={dataId}>
														<td>
															<input
																name="selectedInputs"
																value={dataId}
																type="checkbox"
																onChange={e => {
																	handleChange(e);
																	if (e.target.checked === false) {
																		setFieldValue("selectAllInput", []);
																	}
																}}
																checked={
																	values.selectAllInput[0] === "1" ||
																	values.selectedInputs.findIndex(
																		id => id === dataId
																	) !== -1
																		? true
																		: false
																}
															/>
														</td>
														{value.props.children}
													</tr>
												);
											})}
									</Table>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default AdminTable;
