import './header.scss';

import {AiOutlineMenu, AiOutlineOrderedList} from 'react-icons/ai';

import {FiMail} from 'react-icons/fi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';

Header.propTypes = {
    
};

function Header(props) {
    return (
        <div className='admin-header-container'>
            <div className="admin-header grid">
                <div className="row admin-header__top">
                    <div className="c-6 m-12 row cg-15 admin-header__top__left">
                        <AiOutlineMenu />
                        <div>Databoard</div>
                        <div>Users</div>
                        <div>Settings</div>
                    </div>

                    <div className="c-6 m-12 row cg-15 admin-header__top__right">
                        <IoMdNotificationsOutline />
                        <AiOutlineOrderedList />
                        <FiMail />
                    </div>

                </div>

                <div className="admin-header__botton">
                    
                </div>
            </div>
        </div>
    );
}

export default Header;