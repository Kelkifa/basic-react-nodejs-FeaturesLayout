import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import AdminTable from "features/Admin/components/AdminTable";
import {Link} from "react-router-dom";
import {deleteProducts} from "features/Product/productSlice";
import {numberToCost} from "assets/cores/cores";

ProductList.propTypes = {};

function ProductList(props) {
	const dispatch = useDispatch();
	const productInfo = useSelector(state => state.products.admin.list);

	// States
	const [notifice, setNotifice] = useState({
		isShow: false,
		message: null,
		loading: false,
		error: null,
	});

	const productTableHeaders = [
		"Stt",
		"Name",
		"Type",
		"Cost",
		"Description",
		"image",
		"Shape Image",
		"Color Image",
		"Shape",
		"Color",
		"City",
		"CreatedAt",
		"UpdatedAt",
		"Options",
	];

	const productIdList = productInfo.data.map(product => product._id);

	// id of products will been deleted
	const handleDelete = async data => {
		if (!data.length) {
			setNotifice({
				isShow: true,
				message: "Bạn chưa chọn sản phẩm để xoá",
				loading: false,
				error: true,
			});
			return;
		}
		setNotifice({isShow: false, message: null, loading: true, error: null});

		try {
			const response = await dispatch(deleteProducts({data}));

			// Notifice
			if (!response.payload.success) {
				setNotifice({
					isShow: true,
					message: response.payload.message,
					error: true,
					loading: false,
				});
				return;
			}

			// Success
			setNotifice({
				isShow: true,
				message: `Xoá thành công (${data.length})`,
				error: false,
				loading: false,
			});
		} catch (err) {
			setNotifice({
				isShow: true,
				message: err.message,
				loading: false,
				error: true,
			});
		}
	};
	// RENDER
	return (
		<AdminTable
			header={{title: "Product list", content: "Danh sách các sản phẩm"}}
			idList={productIdList}
			tableHeaders={productTableHeaders}
			adminHandleDelete={handleDelete}
			dataInfo={{loading: productInfo.loading, error: productInfo.error}}
			notifice={notifice}
		>
			{productInfo.data.map((product, index) => (
				<tr dataId={product._id} key={product._id}>
					<td> {index + 1} </td>
					<td> {product.name} </td>
					<td> {product.type} </td>
					<td className="cost-style">{numberToCost(product.cost)}</td>
					<td> {product.description}</td>
					<td></td>
					<td></td>
					<td></td>
					<td>
						{product.shapes.map((shape, index) => {
							if (index === product.shapeslenght + 1) return shape.name;
							return shape.name + ", ";
						})}
					</td>
					<td>
						{product.colors.map((color, index) => {
							if (index === product.colorslenght + 1) return color.name;
							return color.name + ", ";
						})}
					</td>
					<td>{product.position}</td>
					<td>{product.createdAt}</td>
					<td>{product.updatedAt}</td>
					<td>
						<Link
							to={`/admin/products/${product._id}/update`}
							className="custom-link"
						>
							Update
						</Link>
						<div
							onClick={() => {
								handleDelete([product._id]);
							}}
							className="custom-link"
						>
							Delete
						</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default ProductList;
