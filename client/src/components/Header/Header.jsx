import './header.scss';
import 'assets/scss/logo/logo.css';

import {FiShoppingCart} from "react-icons/fi";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { linkStyle } from 'assets/styles/styles';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className="header">
            <div className="grid wide">
                <div className="row header__auth">
                    <div className="header__auth__item">
                        <Link to="/auth/login" style={linkStyle}>Login</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="c-12 header__icon-container grid__item--cc">
                        <i className="icon-logoDesignBlack" style={{fontSize:"250px", color:"white"}}></i>
                    </div>
                </div>
                <div className="row grid header__search">
                    <div className="c-12 row cg-0">
                        <input className="c-9 t-8 m-8" type="text" placeholder="Tìm kiếm sản phẩm .." />
                        <button className="c-2 t-3 m-3">Tìm kiếm</button>
                        <Link to="/cart" className="cart-icon">
                            <FiShoppingCart className="cart-icon"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;