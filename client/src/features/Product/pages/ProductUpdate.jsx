import * as yup from "yup";

import {FastField, Formik} from "formik";
import React, {useState} from "react";
import {adminAddProduct, updateProduct} from "../productSlice";
import {useDispatch, useSelector} from "react-redux";

import InputField from "components/Form/InputField";
import LoadNotifice from "components/Dialog/LoadNotifice";
import ShowImagesField from "features/Admin/components/ShowImagesField";
import {schema} from "./ProductCreate";
import {textareaDataToArray} from "assets/cores/cores";
import {useParams} from "react-router-dom";

function ProductUpdate(props) {
	const {id} = useParams();
	const productInfo = useSelector(state => {
		const product = state.products.admin.list.data.find(
			value => value._id === id
		);
		return {
			data: product,
			loading: state.products.admin.list.loading,
			error: state.products.admin.list.error,
		};
	});

	const dispatch = useDispatch();
	// HANDLE FUNCTIONS
	const [dialog, setDialog] = useState({loading: false, error: null});

	const [shapeError, setShapeError] = useState(null);
	const [colorError, setColorError] = useState(null);
	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		// Check shape/color name size and shape/color link size
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
			const response = await dispatch(updateProduct({data: values, id}));
			console.log(response);
		} catch (error) {
			console.log(error.message);
		}

		newDialog = {...dialog};
		setDialog(newDialog);
	};
	// RENDER

	if (productInfo.loading)
		return <div className="admin-layout-fluid">Loading ...</div>;
	if (productInfo.error)
		return <div className="admin-layout-fluid">{productInfo.error}</div>;

	const shapes = productInfo.data.shapes.reduce(
		(total, value, index) => {
			if (index !== 0) {
				return [total[0] + "\n" + value.name, total[1] + "\n" + value.img];
			}

			return [total[0] + value.name, total[1] + value.img];
		},
		["", ""]
	);
	const colors = productInfo.data.colors.reduce(
		(total, value, index) => {
			if (index !== 0) {
				return [total[0] + "\n" + value.name, total[1] + "\n" + value.img];
			}

			return [total[0] + value.name, total[1] + value.img];
		},
		["", ""]
	);

	const initialValues = {
		img: "",
		name: productInfo.data.name,
		cost: productInfo.data.cost,
		description: productInfo.data.description,
		position: productInfo.data.position,
		type: productInfo.data.type,
		shapeNames: shapes[0],
		colorNames: colors[0],
		shapeLinks: shapes[1],
		colorLinks: colors[1],
	};
	return (
		<div className="admin-update">
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
										setError={colorError}
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
										setError={shapeError}
									/>
									<FastField
										name="colorLinks"
										className="c-6 m-12"
										label="Color links"
										placeholder="Đường dẫn đến ảnh 1&#10;Đường dẫn đến ảnh 2&#10;Đường dẫn đến ảnh 3..."
										inputEle="textarea"
										component={InputField}
										setError={colorError}
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

export default ProductUpdate;
