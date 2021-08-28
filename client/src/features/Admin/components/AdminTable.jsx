import {Formik} from "formik";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table";
import {useDispatch} from "react-redux";

AdminTable.propTypes = {
	tableHeaders: PropTypes.array,
	header: PropTypes.object,
	idList: PropTypes.array,
	pageType: PropTypes.string,
	dataInfo: PropTypes.object,

	adminHandleDelete: PropTypes.func,
};
AdminTable.defaultProps = {
	tableHeaders: [],
	header: {title: "", content: ""},
	idList: [],
	pageType: "list",
	dataInfo: {loading: false, error: null},

	adminHandleDelete: null,
};

function AdminTable(props) {
	const dispatch = useDispatch();
	// PROPS
	const {
		children,
		pageType,
		tableHeaders,
		header,
		idList,
		dataInfo,
		adminHandleDelete,
		adminHandleRestore,
	} = props;

	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		// console.log(values);
		// return;
		try {
			// console.log(values.selectedInputs);
			// console.log(adminHandleSubmit);
			if (values.submit === "restore") {
				const response = await dispatch(
					adminHandleRestore(values.selectedInputs)
				);
				return;
			}
			const response = await dispatch(adminHandleDelete(values.selectedInputs));
			console.log("[RESPONSE]", response);
		} catch (err) {
			console.log(err);
		}
	};

	// RENDER
	let processElement = null;

	if (!children.length) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length}>
					Trống
				</td>
			</tr>
		);
	}
	if (dataInfo.error) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length}>
					{dataInfo.error}
				</td>
			</tr>
		);
	} else if (dataInfo.loading) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length}>
					Loading ...
				</td>
			</tr>
		);
	}

	return (
		<div className="admin-list">
			<div className="admin-list__notifice admin-layout-fluid">avx</div>

			<div className="admin-list__content admin-layout-fluid">
				<Formik
					onSubmit={handleSubmit}
					initialValues={{selectAllInput: [], selectedInputs: [], submit: ""}}
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
										<button
											type="submit"
											className="custom-link"
											name="submit"
											value="delete"
											onClick={handleChange}
										>
											Xoá
										</button>

										{pageType === "trash" && (
											<button
												type="submit"
												name="submit"
												value="restore"
												className="custom-link"
												style={{marginLeft: "7px"}}
												onClick={handleChange}
											>
												Restore
											</button>
										)}
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
										{processElement && processElement}

										{!processElement &&
											!children({handleChange, setFieldValue}).length && (
												<tr>
													<td
														colSpan={tableHeaders.length}
														style={{textAlign: "center"}}
													>
														{pageType === "trash"
															? "Thùng rác trống"
															: "Không có dữ liệu"}
													</td>
												</tr>
											)}
										{!processElement &&
											children &&
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
