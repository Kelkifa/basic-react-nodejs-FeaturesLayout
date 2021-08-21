import './leftbar.scss';

import { FaBook, FaUserFriends } from 'react-icons/fa';
import React, { useState } from 'react';

import AdminLeftbarDropdown from './AdminLeftbarDropdown';
import {BsFillBarChartFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MDropdown from '../../../components/Dropdown/MDropdown';
import {MdBorderColor} from 'react-icons/md';
import PropTypes from 'prop-types';
import {RiAdminFill} from 'react-icons/ri';
import{SiInstacart} from 'react-icons/si';
import { linkStyle } from 'assets/styles/styles';

Leftbar.propTypes = {
    isShow: PropTypes.bool,
}
Leftbar.defaultProps = {
    isShow: true
}
function Leftbar(props) {
    const {isShow} = props;

    return (
        <div
            className={
                isShow
                ? 'admin-leftbar custom-scroll'
                : 'admin-leftbar custom-scroll admin-leftbar--hide'
            }
        >
            <h2 className='admin-leftbar__header'>
                <RiAdminFill className='admin-leftbar__header__icon'/>
                <span className='admin-leftbar__header__text'>Admin</span>
            </h2>
            <ul className='admin-leftbar__tabs'>
                <Link to='/' style={linkStyle}>
                    <li className='admin-leftbar__tabs__item grid'>
                        <div className="row-c14">
                            <BsFillBarChartFill className='admin-leftbar__tabs__item__icon c-2'/> 
                            <div className='admin-leftbar__tabs__item__text c-12'>DataBoard</div>
                        </div>
                    </li>
                </Link>
                <li className='admin-leftbar__tabs__title'>
                    EXTRAS
                </li>
                <li>
                    <MDropdown>
                        {(handleClick, isShow)=>{
                            return(
                                <AdminLeftbarDropdown 
                                    iconComponennt={(<FaBook />)}
                                    showText='Pages'
                                    hideTextList={[
                                        {to:'/', text:'Home'},
                                        {to:'/cart', text:'Cart'},
                                        {to:'/admin', text:'Admin'},
                                    ]}
                                
                                    handleClick={handleClick}
                                    isShow={isShow}
                                />
                            )
                        }}
                    </MDropdown>
                </li>
                <li>
                    <MDropdown>
                        {(handleClick, isShow)=>{
                            return(
                                <AdminLeftbarDropdown 
                                    iconComponennt={(<MdBorderColor />)}
                                    showText='Orders'
                                    hideTextList={[
                                        {to:'/admin/orders/table', text:'Table'},
                                        {to:'/admin/orders/trash', text:'Trash'},
                                    ]}
                                
                                    handleClick={handleClick}
                                    isShow={isShow}
                                />
                            )
                        }}
                    </MDropdown>
                </li>

                <li className="admin-leftbar__tabs__title">
                    MANAGE
                </li>
                
                <li>
                    <MDropdown>
                        {(handleClick, isShow)=>{
                            return(
                                <AdminLeftbarDropdown 
                                    iconComponennt={(<SiInstacart />)}
                                    showText='Products'
                                    hideTextList={[
                                        {to:'/admin/products/table', text:'Table'},
                                        {to:'/admin/products/create', text:'Create'},
                                        {to:'/admin/products/trash', text:'Trash'},
                                    ]}
                                
                                    handleClick={handleClick}
                                    isShow={isShow}
                                />
                            )
                        }}
                    </MDropdown>
                </li>

                <li>
                    <MDropdown>
                        {(handleClick, isShow)=>{
                            return(
                                <AdminLeftbarDropdown 
                                    iconComponennt={(<FaUserFriends />)}
                                    showText='Users'
                                    hideTextList={[
                                        {to:'/', text:'Table'},
                                        {to:'/', text:'Create'},
                                        {to:'/', text:'Trash'},
                                    ]}
                                
                                    handleClick={handleClick}
                                    isShow={isShow}
                                />
                            )
                        }}
                    </MDropdown>
                </li>
            </ul>
        </div>
    );
}

export default Leftbar;


// showComponent={
                           
// }
// hideComponent={

// }