import './authLayout.scss';

import React from 'react';

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