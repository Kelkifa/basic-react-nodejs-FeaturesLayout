import * as yup from "yup";

import {FastField, Formik} from "formik";
import React, {useState} from "react";

import FailNotifice from "components/Dialog/FailNotifice";
import LoadNotifice from "components/Dialog/LoadNotifice";
import ProductTypeSelect from "features/Product/components/ProductTypeSelect";
import PropTypes from "prop-types";
import SuccessNotifice from "components/Dialog/SuccessNotifice";
import {addCart} from "../../Cart/cartSlice";
import {useDispatch} from "react-redux";

AddCartForm.propTypes = {
	shapes: PropTypes.array,
	colors: PropTypes.array,
	productId: PropTypes.string,
};

AddCartForm.defaultProps = {
	shapes: [],
	colors: [],
	productId: null,
};

function AddCartForm(props) {
	const dispatch = useDispatch();
	// PROPS
	const {shapes, colors, productId} = props;

	const initialvalues = {
		shape: "",
		color: "",
		soLuong: 1,
		productId,
	};
	// Notifices
	const [successNotifice, setSuccessNotifice] = useState(false); // hien thi thong bao thanh cong
	const [failNotifice, setFailNotifice] = useState(false); // hien thi thong bao that bai
	const [loadNotifice, setLoadNotifice] = useState(false); // hien thi thong bao Loading

	const schema = yup.object().shape({
		shape: yup
			.string()
			.nullable()
			.oneOf(shapes.map(value => value.name))
			.required("empty"),
		color: yup
			.string()
			.nullable()
			.oneOf(colors.map(value => value.name))
			.required("empty"),
		productId: yup.string().nullable().oneOf([productId]).required("empty"),
		submit: yup.string().nullable().oneOf(["add", "buy"]).required(),
	});
	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		console.log(values);
		if (!values.submit) return;

		setLoadNotifice(true);

		try {
			if (values.submit === "add") {
				const response = await dispatch(
					addCart({
						data: {
							shape: values.shape,
							color: values.color,
							soLuong: values.soLuong,
							productId: values.productId,
						},
					})
				);

				setLoadNotifice(false);
				// Fail
				if (!response.payload.success) {
					setFailNotifice(true);
					setTimeout(() => {
						setFailNotifice(false);
					}, 1000);
				}

				// Success
				setSuccessNotifice(true);
				setTimeout(() => {
					setSuccessNotifice(false);
				}, 1000);
				if (values.submit === "buy");
			}
		} catch (e) {
			console.log(e);
			setLoadNotifice(false);
			setFailNotifice(true);
			setTimeout(() => {
				setFailNotifice(false);
			}, 1200);
		}
	};
	// RENDER
	return (
		<Formik
			initialValues={initialvalues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{formikProps => {
				const {errors, touched, handleSubmit, handleChange, values} =
					formikProps;

				return (
					<form onSubmit={handleSubmit}>
						<FastField
							name="shape"
							label="Hình dáng"
							options={shapes}
							type="select"
							component={ProductTypeSelect}
						/>
						<FastField
							name="color"
							label="Màu sắc"
							options={colors}
							type="select"
							component={ProductTypeSelect}
						/>
						<FastField
							name="soLuong"
							label="Số lượng"
							options={colors}
							type="number" //select or number
							remainProducts={100}
							component={ProductTypeSelect}
						/>
						{/* <ProductTypeSelect
							name="shape"
							label="Hình dáng"
							options={shapes}
							type="select" //select or number
						/>
						<ProductTypeSelect
							name="color"
							label="Màu sắc"
							options={colors}
							type="select" //select or number
						/>
                    */}
						{(errors.color && touched.color) ||
						(errors.shape && touched.shape) ? (
							<div className="detail__right__notifice custom-text--dange">
								Bạn chưa chọn hình dáng hoặc màu sắc
							</div>
						) : (
							""
						)}
						<div className="detail__right__btns">
							<button
								name="submit"
								value="add"
								onClick={handleChange}
								type="submit"
								className="custom-btn__add-cart btn"
							>
								Thêm vào giỏ
							</button>
							<button type="submit" className="custom-btn__buy btn">
								Mua ngay
							</button>
						</div>
						{loadNotifice && <LoadNotifice />}
						{failNotifice && <FailNotifice />}
						{successNotifice && <SuccessNotifice />}
					</form>
				);
			}}
		</Formik>
	);
}

export default AddCartForm;
