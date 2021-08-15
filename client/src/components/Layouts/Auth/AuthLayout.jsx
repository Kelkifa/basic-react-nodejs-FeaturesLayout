import './authLayout.scss';

import PropTypes from 'prop-types';
import React from 'react';

AuthLayout.propTypes = {
    
};

function AuthLayout(props) {
    const {children} = props;

    return (
        <>
            <div className="auth-layout">
                {children}
            </div>
        </>
    );
}

export default AuthLayout;