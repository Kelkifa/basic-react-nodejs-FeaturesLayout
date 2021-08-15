import './loginPage.scss';
import 'assets/scss/logo/logo.css';

import LoginForm from '../components/LoginForm';
import React from 'react';

function LoginPage(props) {
    return (
        <div className="grid wide login-page">
            <div className="row">
                <div className="c-6 login-page__logo">
                    <i className="icon-logoDesignBlack" ></i>
                </div>
                <div className="c-4 login-page__form">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;