import React, {useState} from "react";
import {
	forceDeleteProducts,
	restoreProducts,
} from "features/Product/productSlice";
import {useDispatch, useSelector} from "react-redux";

import AdminTable from "features/Admin/components/AdminTable";
import {numberToCost} from "assets/cores/cores";

ProductTrash.propTypes = {};

function ProductTrash(props) {
	const dispatch = useDispatch();
	const productInfo = useSelector(state => state.products.admin.trash);

	const productTrashHeaders = [
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

	const [notifice, setNotifice] = useState({
		isShow: false,
		message: null,
		loading: false,
		error: null,
	});

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
			const response = await dispatch(forceDeleteProducts({data}));

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
				message: `Xoá viễn viễn thành công (${data.length})`,
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
		return forceDeleteProducts({data});
	};
	const handleRestore = async data => {
		if (!data.length) {
			setNotifice({
				isShow: true,
				message: "Bạn chưa chọn sản phẩm để khôi phục",
				loading: false,
				error: true,
			});
			return;
		}
		setNotifice({isShow: false, message: null, loading: true, error: null});

		try {
			const response = await dispatch(restoreProducts({data}));

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
				message: `Khôi phục thành công (${data.length})`,
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
			header={{
				title: "Product trash",
				content: "Danh sách các sản phẩm đã bị xoá",
			}}
			idList={productIdList}
			notifice={notifice}
			tableHeaders={productTrashHeaders}
			adminHandleDelete={handleDelete}
			adminHandleRestore={handleRestore}
			pageType="trash"
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
						<div
							className="custom-link"
							onClick={() => {
								handleRestore([product._id]);
							}}
						>
							Restore
						</div>
						<div
							className="custom-link"
							onClick={() => {
								handleDelete([product._id]);
							}}
						>
							Delete
						</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default ProductTrash;
