import "../../../assets/scss/components/btn.scss";
import "./detail.scss";

import React, {useRef, useState} from "react";

import AddCartForm from "../components/AddCartForm";
import ImageShow from "../components/ImageShow";
import {numberToCost} from "../../../assets/cores/cores";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function Detail(props) {
	// PARAMS
	const {id: idParam} = useParams();
	console.log({idParam});

	const productInfo = useSelector(state => {
		const productInfo = state.products;
		console.log(productInfo);
		return {
			loading: productInfo.loading,
			error: productInfo.error,
			data:
				productInfo.data &&
				productInfo.data.find(value => value._id === idParam),
		};
	});
	console.log(productInfo);

	const [optionImg, setOptionImg] = useState("");

	// FUNCTION HANDLERS

	return (
		<div className="detail-page">
			<div className="grid wide detail">
				{!productInfo.loading && !productInfo.error ? (
					<div className="row cg-15">
						<div className="c-6 t-12 detail__left">
							<ImageShow imgList={productInfo.data.img} optionImg={optionImg} />
						</div>

						<div className="c-6 t-12 detail__right">
							<div className="detail__right__name">{productInfo.data.name}</div>

							<div className="detail__right__sold">
								<span>Chưa có đánh giá</span>
								<span> | </span>
								<span>{productInfo.data.sold}</span>
								<span> đã bán</span>
							</div>
							<div className="detail__right__description custom-scroll">
								{productInfo.data.description}
							</div>

							<div className="detail__right__cost">
								{numberToCost(productInfo.data.cost)}đ
							</div>
							<AddCartForm
								initialValues={{
									shape: null,
									color: null,
									soLuong: 0,
									productId: idParam,
								}}
								shapes={productInfo.data.shapes}
								colors={productInfo.data.colors}
								productId={idParam}
							/>
							<div></div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default Detail;
