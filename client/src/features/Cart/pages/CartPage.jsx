import "./cartPage.scss";
import "assets/scss/components/btn.scss";

import {Formik} from "formik";
import React from "react";
import Table from "components/Table/Table";
import {numberToCost} from "assets/cores/cores";
import {useSelector} from "react-redux";

function CartPage(props) {
	const carts = useSelector(state => state.carts);
	const cartIdList = carts.data.map(cart => cart._id);
	const initialValues = {
		selectedAll: [],
		selectedList: [],
	};
	// HANDLE FUNCTIONS
	const handleSubmit = values => {
		console.log(values);
	};
	// RENDER
	if (carts.loading) return <div className="cart-page grid wide">Loading</div>;

	if (carts.error)
		return <div className="cart-page grid wide">{carts.error}</div>;

	return (
		<div className="cart-page grid wide">
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
					} = formikProps;

					console.log(values);

					return (
						<form onSubmit={handleSubmit}>
							<div className="row cart__group">
								<div className="c-12 cart__control">
									<div className="cart__control__left">
										<input
											name="selectedAll"
											onChange={e => {
												handleChange(e);
												if (e.target.checked === true) {
													setFieldValue("selectedList", cartIdList);
													return;
												}
												setFieldValue("selectedList", []);
											}}
											onBlur={handleBlur}
											value="checked"
											type="checkbox"
											checked={
												values.selectedList.length === cartIdList.length ||
												values.selectedAll[0]
													? true
													: false
											}
										/>
										<div>Chọn tất cả</div>
									</div>
									<div className="cart__control__right">
										<div>Tổng số lượng sản phẩm</div>
										<div>
											<span>(</span>
											<span>0</span>
											<span> sản phẩm)</span>
										</div>
										<div className="cart__control__right__cost">0đ</div>
										<button
											type="submit"
											className="cart__control__right__buy custom-btn__buy"
										>
											Mua ngay
										</button>
									</div>
								</div>
							</div>
							<div className="row cart__group">
								<div className="c-12 cart__table">
									<Table
										headerList={[
											"",
											"Sản phẩm",
											"Mô tả",
											"Hình dáng",
											"Màu sắc",
											"Đơn giá",
											"Số lượng",
											"Thành tiền",
											"Lựa chọn",
										]}
									>
										{carts.data.map(cart => (
											<tr key={cart._id}>
												<td>
													<input
														type="checkbox"
														name="selectedList"
														value={cart._id}
														onChange={e => {
															handleChange(e);
															if (e.target.checked === false) {
																setFieldValue("selectedAll", []);
															}
														}}
														onBlur={handleBlur}
														checked={
															values.selectedList.indexOf(cart._id) !== -1 ||
															values.selectedAll[0]
																? true
																: false
														}
													/>
												</td>
												<td>{cart.productId.name}</td>
												<td>{cart.productId.description}</td>
												<td>{cart.shape}</td>
												<td>{cart.color}</td>
												<td className="cost-style">
													{numberToCost(cart.productId.cost)}
												</td>
												<td>{cart.soLuong}</td>
												<td className="cost-style">
													{numberToCost(cart.soLuong * cart.productId.cost)}
												</td>
												<td>
													<button className="custom-link">Delete</button>
												</td>
											</tr>
										))}
									</Table>
								</div>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

export default CartPage;
