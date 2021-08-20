import React, { useState } from 'react';

import FailNotifice from '../../../components/Dialog/FailNotifice';
import FormNotifice from 'components/Dialog/FormNotifice';
import LoadNotifice from 'components/Dialog/LoadNotifice';
import ProductTypeSelect from './ProductTypeSelect';
import PropTypes from 'prop-types';
import SuccessNotifice from 'components/Dialog/SuccessNotifice';
import { addCart } from '../../Cart/cartSlice';
import { useDispatch } from 'react-redux';

AddCartForm.propTypes = {
    initialValues: PropTypes.object,
    shapes: PropTypes.array,
    colors: PropTypes.array,
    productId: PropTypes.string,
};

AddCartForm.defaultProps = {
    initialValues: {},
    shapes: [
        {name:null, img: null},
        {name:null, img: null},
        {name:null, img: null},
    ],  
    colors: [
        {name:null, img: null},
        {name:null, img: null},
        {name:null, img: null},
    ],
    productId: null,
}

function AddCartForm(props) {
    const dispatch = useDispatch();
    // PROPS
    const {initialValues, shapes, colors, productId} = props;

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
    const btnClickHandler = async (type)=>{

        // Varidation
        if((!values.shape && shapes.length>0) || (!values.color && colors.length>0)){
            setFailNotifice(true);
            setTimeout(()=>{setFailNotifice(false)}, 1500);
            return;
        }

        // Add Cart
        if(type === 'cart'){
            try{
                await dispatch(addCart(values))
            }catch(err){
                console.log(err);
            }
        }

    }

    return (
        <form onSubmit={submitHandler} >
            <ProductTypeSelect
                name ="shape"
                label = "Hình dáng"
                options = {shapes}
                type= 'select'  //select or number
                
                valueChange={valueChangeHandler}
            />
             <ProductTypeSelect
                name ="color"
                label = "Màu sắc"
                options = {colors}
                type= 'select'  //select or number
                
                valueChange={valueChangeHandler}
            />
             <ProductTypeSelect
                name ="soLuong"
                label = "Số lượng"
                options = {colors}
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