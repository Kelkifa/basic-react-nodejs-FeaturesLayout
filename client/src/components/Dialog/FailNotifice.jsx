import './notifice.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {IoWarningSharp} from 'react-icons/io5';
FailNotifice.propTypes = {
    
};

function FailNotifice(props) {
    return (
        <div className="dialog-container">
            <div className="dialog__content">
                <div className="dialog__content__icon">
                    <IoWarningSharp className="icon icon-fail"/>
                </div>
                <p className="dialog__content__text">
                    Vui Lòng chọn hình dáng và màu sắc
                </p>
            </div>
        </div>
    );
}

export default FailNotifice;