import './formNotifice.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';

FormNotifice.propTypes = {
    
};

function FormNotifice(props) {
    const initialValues = {
        shape: '',
    }
    return (
        <div className="dialog-container">
            <div className="dialog__form">
                <Formik
                    initialValues = {initialValues}
                >

                    {formikProps=>{
                        const {values, errors, touched} = formikProps;
                        console.log(values);
                        return(
                            <Form>
                                <FastField 
                                    name="shape"
                                    // component={SelectInputField}

                                    label="Shape 1"

                                />
                            </Form>
                        )
                    }}
                </Formik>   
            </div>            
        </div>
    );
}

export default FormNotifice;

