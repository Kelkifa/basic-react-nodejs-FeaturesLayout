import './productTypeSelect.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {FaRegCheckCircle} from 'react-icons/fa';

ProductTypeSelect.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
    options: PropTypes.array,
    type: PropTypes.string,
    remainProducts: PropTypes.number,

    mouseOverOptions: PropTypes.func,
};

ProductTypeSelect.defaultProps = {
    label: null,
    options: [],
    type: 'select',
    remainProducts: 100,

    mouseOverOptions: null,
}

function ProductTypeSelect(props) {
    // PROPS
    const {
        form, field,
        label, options, type, remainProducts, // Option [name, image]
        mouseOverOptions                        // Mouse over to options
    } = props;

    // STATES
    const [active, setActive] = useState(false); //index of select item

    // FUNCTION HANDLER
    const clickHandler = (index, value) =>{
        setActive(index);
        
        // Form value change
        const changeEvent = {
            target:{
                name: field.name,
                value
            }
        }
        field.onChange(changeEvent);
    }

    // RENDER
    return (
        <div className="detail__right__select__group">
            <div className="detail__right__select__group__label">
                <div className="detail__right__select__group__label__text">{label}</div>
            </div>
            {type === 'select' && 
                <ul className="detail__right__select__group__options">
                    {options.map((option, index) => (
                        <li
                            className={active === index ? "detail__right__select__group__options__item detail__right__select__group__options__item--active" : "detail__right__select__group__options__item"}
                            key={option.name}
                            onClick={()=>{clickHandler(index, option.name)}}
                            onMouseOver={()=>{if(mouseOverOptions) mouseOverOptions(option.image)}}
                        >
                            {option.name}

                            {active === index && <FaRegCheckCircle 
                                className="detail__right__select__group__options__item__icon"
                            />}
                        </li>
                    ))}
                </ul>
            }
            {type === 'number' && (
                <div className="detail__right__select__group__options">
                    <input 
                        type={type} 
                        className="detail__right__select__group__options__input" 
                        type="number"
                        value={field.value}
                        max="100" min="0"
                        onChange={field.onChange}
                        name={field.name}
                    />
                    <div className="detail__right__select__group__options__available">
                        {remainProducts} sản phẩm còn lại
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default ProductTypeSelect;