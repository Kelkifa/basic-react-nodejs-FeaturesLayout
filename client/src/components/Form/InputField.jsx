import './inputField.scss';

import PropTypes from 'prop-types';
import React from 'react';

// import { Form, FormGroup, Input, Label } from 'reactstrap'




InputField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    type: PropTypes.string,
};

InputField.defaultProps = {
    label:null,
    placeHolder:null,
    type: 'text'
}

function InputField(props) {
    const { //form,
        field,
        label, placeholder, type
    } = props;
    

    
    return (
        <div className="input-field">
            <label
                htmlFor={field.name}
            >
                {label}
            </label>
            <input 
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                
                type={type} 
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputField; 