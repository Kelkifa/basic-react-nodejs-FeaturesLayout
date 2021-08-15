import './loginForm.scss';

import * as yup from 'yup';

import { FastField, Form, Formik } from 'formik';

import { Button } from 'reactstrap';
import InputField from 'components/Form/InputField';
import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

// YUP
const loginSchema = yup.object().shape({
    username: yup.string().required('Bạn chưa nhập tài khoản').nullable(),
    password: yup.string().required('Bạn chưa nhập mật khẩu').nullable(),
})


const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/cart',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};


function LoginForm(props) {
    const initialValues = {
        username: '',
        password: '',
    }

    // HANDLER FUNCTIONS
    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <Formik
            initialValues={initialValues}

            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {formikProps => {

                console.log(formikProps.errors);

                return (
                    <Form>
                        <FastField
                            name="username"
                            component={InputField}

                            label="Username"
                            placeHolder="Username"
                        />
                        <FastField
                            name="password"
                            component={InputField}

                            label="Password"
                            placeHolder="Password"
                        />
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        <div className="btn-container">
                            <Button className="btn-auth" color="primary" type="submit">Login</Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default LoginForm;