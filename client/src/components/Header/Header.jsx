import "./header.scss";
import "assets/scss/logo/logo.css";

import {FiShoppingCart} from "react-icons/fi";
import {Link} from "react-router-dom";
import React from "react";
import UserBtn from "components/UserBtn";
import {linkStyle} from "assets/styles/styles";
import {useSelector} from "react-redux";

function Header(props) {
	const cartLength = useSelector(state => state.carts.data.length);

	const user = useSelector(state => state.user);
	const userInfo = user.data;

	return (
		<div className="header">
			<div className="grid wide">
				<div className="row header__auth">
					<div className="header__auth__item">
						{userInfo.uid && !user.loading && !user.error ? (
							<UserBtn
								name={userInfo.name}
								img={userInfo.picture}
								uid={userInfo.uid}
							/>
						) : (
							<Link to="/auth/login" style={linkStyle}>
								Login
							</Link>
						)}
					</div>
				</div>
				<div className="row">
					<div className="c-12 header__icon-container grid__item--cc">
						<Link to="/" style={linkStyle}>
							<i
								className="icon-logoDesignBlack"
								style={{fontSize: "250px", color: "white"}}
							></i>
						</Link>
					</div>
				</div>
				<div className="row grid header__search">
					<div className="c-12 row cg-0">
						<input
							className="c-9 t-8 m-8"
							type="text"
							placeholder="Tìm kiếm sản phẩm .."
						/>
						<button className="c-2 t-3 m-3">Tìm kiếm</button>
						<div className="cart-icon">
							<Link to="/cart" style={linkStyle}>
								<FiShoppingCart className="cart-icon" />
							</Link>
							{cartLength ? (
								<div className="cart-icon__number animation--jump">
									{cartLength}
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
