import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductTypeSelect from './ProductTypeSelect';
import SuccessNotifice from '../../../components/Dialog/SuccessNotifice';
import FailNotifice from '../../../components/Dialog/FailNotifice';
import LoadNotifice from '../../../components/Dialog/LoadNotifice';
import FormNotifice from '../../../components/Dialog/FormNotifice';
import { useDispatch } from 'react-redux';
import { addCart } from '../../Cart/cartSlice';
import { useHistory } from 'react-router-dom';

AddCartForm.propTypes = {
    initialValues: PropTypes.object,
    shape: PropTypes.array,
    color: PropTypes.array,
};

AddCartForm.defaultProps = {
    initialValues: {},
    shape: [
        {name:'shape1', image: ''},
        {name:'shape2', image: ''},
        {name:'shape3', image: ''},
    ],  
    color: []
}

function AddCartForm(props) {
    const dispatch = useDispatch()
    const history = useHistory();

    // PROPS
    const {initialValues, shape, color} = props;

    // STATES
    const [values, setValues] = useState({...initialValues});
    const [errors, setErrors] = useState({});
    // Notifices
    const [successNotifice, setSuccessNotifice] = useState(false); // hien thi thong bao thanh cong
    const [failNotifice, setFailNotifice] = useState(false);    // hien thi thong bao that bai
    const [loadNotifice, setLoadNotifice] = useState(false);    // hien thi thong bao Loading
    const [formNotifice, setFormNotifice] = useState(false);    // hien thi thong bao Loading

    // FUNCTION HANDLER
    //
    const valueChangeHandler = (action) =>{
        if(!action.name) return;

        const newValues = {... values};
        newValues[action.name] = action.payload;
        setValues(newValues); 
    }
    // Submit
    const submitHandler = (e)=>{
        e.preventDefault();
        
    }
    // Add cart click
    const btnClickHandler = (type)=>{

        // Varidation
        if((!values.shape && shape.length>0) || (!values.color && color.length>0)){
            setFailNotifice(true);
            setTimeout(()=>{setFailNotifice(false)}, 1500);
            return;
        }

        // Add Cart
        if(type === 'cart'){
            const action = addCart(values);
            dispatch(action);
            history.push('/cart');
            return;
        }

    }

    return (
        <form onSubmit={submitHandler} >
            <ProductTypeSelect
                name ="shape"
                label = "Hình dáng"
                options = {shape}
                type= 'select'  //select or number
                
                valueChange={valueChangeHandler}
            />
             <ProductTypeSelect
                name ="color"
                label = "Màu sắc"
                options = {color}
                type= 'select'  //select or number
                
                valueChange={valueChangeHandler}
            />
             <ProductTypeSelect
                name ="soLuong"
                label = "Số lượng"
                options = {color}
                type= 'number'  //select or number
                remainProducts={100}
                
                valueChange={valueChangeHandler}
            />
            <div className="detail__right__btns">
                <div 
                    className="custom-btn__add-cart btn"
                    onClick = {()=>{btnClickHandler('cart')}}
                >
                    Thêm vào giỏ
                </div>
                <div 
                    className="custom-btn__buy btn" 
                    onClick = {()=>{btnClickHandler('buy')}}
                >
                        Mua ngay
                </div>
            </div>

            {successNotifice && <SuccessNotifice />}
            {failNotifice && <FailNotifice />}
            {loadNotifice && <LoadNotifice />}
            {formNotifice && <FormNotifice />}

        </form>
        
    );
}

export default AddCartForm;