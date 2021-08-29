import React, {useState} from "react";

import {Formik} from "formik";
import LoadNotifice from "components/Dialog/LoadNotifice";
import PropTypes from "prop-types";
import Table from "components/Table/Table";
import {useDispatch} from "react-redux";

AdminTable.propTypes = {
	tableHeaders: PropTypes.array,
	header: PropTypes.object,
	idList: PropTypes.array,
	pageType: PropTypes.string,
	dataInfo: PropTypes.object,

	adminHandleRestore: PropTypes.func,
	adminHandleDelete: PropTypes.func,
};
AdminTable.defaultProps = {
	tableHeaders: [],
	header: {title: "", content: ""},
	idList: [],
	pageType: "list",
	dataInfo: {loading: false, error: null, process: null},

	adminHandleRestore: null,
	adminHandleDelete: null,
};

function AdminTable(props) {
	const dispatch = useDispatch();
	// PROPS
	const {
		children = [],
		pageType,
		tableHeaders,
		header,
		idList,
		dataInfo,
		adminHandleDelete,
		adminHandleRestore,
	} = props;
	// STATES
	const [notifice, setNotifice] = useState({
		isShow: false,
		message: null,
		loading: false,
		error: null,
	});
	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		// return;
		let newNotifice = {...notifice};
		newNotifice.isShow = false;
		newNotifice.loading = true;
		setNotifice({...newNotifice});

		try {
			if (values.submit === "restore" && adminHandleRestore) {
				const response = await dispatch(
					adminHandleRestore(values.selectedInputs)
				);

				if (response.payload.success === false) {
					newNotifice.error = false;
					newNotifice.message = `Không thể khôi phục: ${values.selectedInputs.length} (${response.payload.message})`;
					newNotifice.loading = false;
					newNotifice.isShow = true;
					setNotifice(newNotifice);
					return;
				}

				newNotifice.error = false;
				newNotifice.loading = false;
				newNotifice.isShow = true;
				newNotifice.message = `khôi phục thành công: ${values.selectedInputs.length} (${response.payload.message})`;
				setNotifice(newNotifice);

				return;
			}
			if (!adminHandleDelete) {
				newNotifice.error = true;
				newNotifice.loading = false;
				newNotifice.isShow = true;
				newNotifice.message = "Client error !";
				setNotifice({...newNotifice});
				return;
			}
			const response = await dispatch(adminHandleDelete(values.selectedInputs));

			if (response.payload.success === false) {
				newNotifice.error = true;
				newNotifice.loading = false;
				newNotifice.isShow = true;
				newNotifice.message = `Xoá không thành công: ${values.selectedInputs.length} (${response.payload.message})`;
				setNotifice(newNotifice);
				return;
			}

			newNotifice.error = false;
			newNotifice.isShow = true;
			newNotifice.loading = false;
			newNotifice.message = `Xoá thành công: ${values.selectedInputs.length} (${response.payload.message})`;
			setNotifice(newNotifice);
		} catch (err) {
			newNotifice.loading = false;
			newNotifice.error = true;
			newNotifice.message = err.message;
			newNotifice.isShow = true;
			setNotifice(newNotifice);
		}
	};

	// RENDER
	let processElement = null;

	if (!children.length) {
		processElement = (
			<tr>
				<td colSpan={tableHeaders.length + 1} style={{textAlign: "center"}}>
					{pageType === "trash" ? "Thùng rác trống" : "Không có dữ liệu"}
				</td>
			</tr>
		);
	}
	if (dataInfo.error) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length + 1}>
					{dataInfo.error}
				</td>
			</tr>
		);
	} else if (dataInfo.loading) {
		processElement = (
			<tr>
				<td style={{textAlign: "center"}} colSpan={tableHeaders.length + 1}>
					Loading ...
				</td>
			</tr>
		);
	}

	return (
		<div className="admin-list">
			{notifice.isShow && (
				<div
					className={
						notifice.error
							? "admin-list__notifice admin-layout-fluid custom-text--dange"
							: "admin-list__notifice admin-layout-fluid custom-text--success"
					}
				>
					{notifice.message}
				</div>
			)}

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
											children.length &&
											children.map(value => {
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
			{notifice.loading && <LoadNotifice></LoadNotifice>}
		</div>
	);
}

export default AdminTable;
