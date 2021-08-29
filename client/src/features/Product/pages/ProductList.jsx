import React, {useContext, useEffect} from "react";

import AdminTable from "features/Admin/components/AdminTable";
import {deleteProducts} from "features/Product/productSlice";
import {numberToCost} from "assets/cores/cores";
import {useSelector} from "react-redux";

ProductList.propTypes = {};

function ProductList(props) {
	const productInfo = useSelector(state => state.products.admin.list);

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
	const handleDelete = data => {
		return deleteProducts({data});
	};
	// RENDER
	return (
		<AdminTable
			header={{title: "Product list", content: "Danh sách các sản phẩm"}}
			idList={productIdList}
			tableHeaders={productTableHeaders}
			adminHandleDelete={handleDelete}
			dataInfo={{loading: productInfo.loading, error: productInfo.error}}
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
						<div className="custom-link">Update</div>
						<div className="custom-link"> Delete</div>
					</td>
				</tr>
			))}
		</AdminTable>
	);
}

export default ProductList;
