import "../components/adminCreate.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import React, {useState} from "react";

import InputField from "components/Form/InputField";
import LoadNotifice from "components/Dialog/LoadNotifice";
import PropTypes from "prop-types";
import Select from "react-select";
import ShowImagesField from "../components/ShowImagesField";
import gameApi from "api/gameApi";
import productApi from "api/productApi";
import {textareaDataToArray} from "assets/cores/cores";

/** YUP SCHEMA */
const schema = yup.object().shape({
	img: yup.string().nullable(),
	name: yup.string(),
	cost: yup.number().required("This field is required").nullable(),
	description: yup.string(),
	position: yup.string(),
	type: yup.string().oneOf(["tiện ích", "mô hình"]),
	shapeNames: yup.string().nullable(),
	colorNames: yup.string().nullable(),
	shapeLinks: yup.string().nullable(),
	colorLinks: yup.string().nullable(),
});

function ProductCreate(props) {
	const initialValues = {
		img: "",
		name: "",
		cost: "",
		description: "",
		position: "",
		type: "tiện ích",
		shapeNames: "",
		colorNames: "",
		shapeLinks: "",
		colorLinks: "",
	};
	const [dialog, setDialog] = useState({loading: false, error: null});

	const [shapeError, setShapeError] = useState(null);
	const [colorError, setColorError] = useState(null);
	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		if (
			textareaDataToArray(values.shapeNames).length !==
			textareaDataToArray(values.shapeLinks).length
		) {
			setShapeError("Shape name and link aren't same size");
			return;
		} else {
			setShapeError(null);
		}
		if (
			textareaDataToArray(values.colorNames).length !==
			textareaDataToArray(values.colorLinks).length
		) {
			setColorError("Color name and link aren't same size");
			return;
		} else {
			setColorError(null);
		}

		let newDialog = {...dialog};
		newDialog.loading = true;
		setDialog(newDialog);
		try {
			const response = await productApi.add({data: values});
			console.log(response);
		} catch (error) {
			console.log(error.message);
		}

		newDialog = {...dialog};
		setDialog(newDialog);
	};

	return (
		<div className="admin-create">
			<div className="admin-layout-fluid admin-create__notifice">loi roi</div>
			<div className="admin-layout-fluid admin-create__content">
				<h3 className="admin-create__content__header">Create Product</h3>

				<Formik
					initialValues={initialValues}
					validationSchema={schema}
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
							setFieldError,
						} = formikProps;
						return (
							<form
								onSubmit={handleSubmit}
								className="grid admin-create__content__form"
							>
								<div className="row cg-15">
									<FastField
										name="name"
										className="c-6 m-12"
										placeholder="Tên sản phẩm ..."
										label="Name"
										component={InputField}
									/>
									<FastField
										name="cost"
										className="c-6 m-12"
										placeholder="Vd: 100.000"
										label="Cost"
										component={InputField}
									/>
								</div>
								<div className="row">
									<FastField
										name="description"
										className="c-12"
										placeholder="Mô tả ..."
										label="Description"
										inputEle="textarea"
										component={InputField}
									/>
								</div>
								<div className="row cg-15">
									<FastField
										name="position"
										className="c-6 m-12"
										placeholder="Vd: Đồng Nai"
										label="Province"
										component={InputField}
									/>
									<FastField
										name="type"
										className="c-6 m-12"
										label="Type"
										options={[
											{value: "tiện ích", label: "Tiện ích"},
											{value: "mô hình", label: "Mô hình"},
										]}
										component={InputField}
										inputEle="select"
									/>
								</div>
								<div className="row cg-15">
									<FastField
										name="img"
										className="c-6 m-12"
										label="Image links"
										component={InputField}
										inputEle="textarea"
										placeholder="Link hình ảnh 1&#10;Link hình ảnh 2&#10;Link hình ảnh 3..."
									/>
									<ShowImagesField
										label="Pre show images"
										className="c-6 m-12"
										imgs={values.img}
									/>
								</div>
								<div className="row cg-15">
									<FastField
										name="shapeNames"
										className="c-6 m-12"
										label="Shape names"
										placeholder="Tên hình dáng 1&#10;Tên hình dáng 2&#10;Tên hình dáng 3..."
										inputEle="textarea"
										component={InputField}
										setError={shapeError}
									/>
									<FastField
										name="colorNames"
										className="c-6 m-12"
										label="Color names"
										placeholder="Tên màu sắc 1&#10;Tên màu sắc 2&#10;Tên màu sắc 3..."
										inputEle="textarea"
										component={InputField}
									/>
								</div>
								<div className="row cg-15">
									<FastField
										name="shapeLinks"
										className="c-6 m-12"
										label="Shape links"
										placeholder="Đường dẫn đến ảnh 1&#10;Đường dẫn đến ảnh 2&#10;Đường dẫn đến ảnh 3..."
										inputEle="textarea"
										component={InputField}
									/>
									<FastField
										name="colorLinks"
										className="c-6 m-12"
										label="Color links"
										placeholder="Đường dẫn đến ảnh 1&#10;Đường dẫn đến ảnh 2&#10;Đường dẫn đến ảnh 3..."
										inputEle="textarea"
										component={InputField}
									/>
								</div>
								<div className="row cg-15">
									<ShowImagesField
										label="Pre show shape images"
										className="c-6 m-12"
										imgs={values.shapeLinks}
									/>
									<ShowImagesField
										className="c-6 m-12"
										label="Pre show color images"
										imgs={values.colorLinks}
									/>
								</div>
								<div className="row admin-create__content__form__btn">
									<button
										className="btn-auth admin-create__form__btn"
										type="submit"
									>
										Submit
									</button>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			{dialog.loading && <LoadNotifice />}
		</div>
	);
}

export default ProductCreate;
