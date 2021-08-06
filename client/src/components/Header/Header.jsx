import './header.scss';
import '../../assets/logo.css';
import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className="header">
            <div className="grid wide">
                <div className="row">
                    <div className="c-12 header__icon-container grid__item--center">
                        <i class="icon-logoDesignBlack" style={{fontSize:"250px", color:"white"}}></i>
                    </div>
                </div>
                <div className="row header__search">
                    <div className="c-10">
                        <input type="text" />
                    </div>
                    <div className="c-2">
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;