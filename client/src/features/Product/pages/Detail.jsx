import '../../../assets/scss/components/btn.scss';
import './detail.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageShow from '../components/ImageShow';
import { numberToCost } from '../../../assets/cores/cores';
import SuccessNotifice from '../../../components/Dialog/SuccessNotifice';
import FailNotifice from '../../../components/Dialog/FailNotifice';
import LoadNotifice from '../../../components/Dialog/LoadNotifice';
import FormNotifice from '../../../components/Dialog/FormNotifice';
import { FastField, Formik } from 'formik';
import ProductTypeSelect from '../components/ProductTypeSelect';


Detail.propTypes = {
    name: PropTypes.string,
    imgList: PropTypes.array,
    description: PropTypes.string,
    cost: PropTypes.number,
    shapes: PropTypes.array,
    colors :PropTypes.array,
    soLuong: PropTypes.number,
    likes: PropTypes.number,
    sold : PropTypes.number,
    
};

Detail.defaultProps = {
    name: "Chậu hoa",
    imgList: ["https://picsum.photos/500/501","https://picsum.photos/500/500","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503"],
    description: "Mô tả chậu hoa",
    cost: 100000,
    shapes: [
        {name:'shape1',image:'https://picsum.photos/600/599'},
        {name:'shape2',image:'https://picsum.photos/700/560'}
    ],
    colors : [
        {name:'color1',image:'https://picsum.photos/601/599'},
        {name:'color2',image:'https://picsum.photos/701/560'}
    ],
    soLuong: 0,
    likes: 0,
    sold : 0,
}
const dialogTimeout = 1500;

function Detail(props) {
    const initialValues = {
        shape:null,
        color:null,
        soLuong:0,
    }
    // PROPS
    const {imgList, name, description, cost, shapes, colors, soLuong, likes, sold} = props;
    
    // STATES
    const [successNotifice, setSuccessNotifice] = useState(false); // hien thi thong bao thanh cong
    const [failNotifice, setFailNotifice] = useState(false);    // hien thi thong bao that bai
    const [loadNotifice, setLoadNotifice] = useState(false);    // hien thi thong bao Loading
    const [formNotifice, setFormNotifice] = useState(false);    // hien thi thong bao Loading

    const [optionImg, setOptionImg] = useState('');

    // FUNCTION HANDLERS
    // Change image show
    const optionMouseOverHandler = (img)=>{
        setOptionImg(img);
    }
    
    // Click btn (add cart and buy now)
    const clickBtnHandler = (btnType)=>{
        console.log(btnType);
    }

    return (
        <div className="detail-page">
            <div className="grid wide detail">
                <div className="row cg-15">
                    <div className="c-6 t-12 detail__left">
                        <ImageShow 
                            imgList={imgList} 
                            optionImg={optionImg} 
                        />
                    </div>

                    <div className="c-6 t-12 detail__right">
                        <div className="detail__right__name">{name}</div>

                        <div className="detail__right__sold">
                            <span>Chưa có đánh giá</span><span> | </span><span>{sold}</span><span> đã bán</span>
                        </div>
                        <div className="detail__right__description custom-scroll">{description}</div>

                        <div className="detail__right__cost">{numberToCost(cost)}đ</div>

                        <Formik 
                            initialValues={initialValues}
                        >
                            { formikProps=>{
                                const {values, errors, touched} = formikProps;

                                return(
                                    <div className="detail__right__select">
                                        <FastField 
                                            name="shape"
                                            component={ProductTypeSelect}

                                            label="Hình dáng"
                                            options={shapes}

                                            mouseOverOptions={optionMouseOverHandler}
                                        />
                                        <FastField 
                                            name="color"
                                            component={ProductTypeSelect}

                                            label="Màu sắc"
                                            options={colors}

                                            mouseOverOptions={optionMouseOverHandler}
                                            
                                        />
                                        <FastField 
                                            name="soLuong"
                                            component={ProductTypeSelect}

                                            label="Số lượng"
                                            type='number'
                                            remainProducts={100}
                                        />
                                    </div>
                                )
                            }}   
                        </Formik>

                        <div className="detail__right__btns">
                            <button className="custom-btn__add-cart" onClick={()=>{clickBtnHandler('cart')}}>Thêm vào giỏ</button>
                            <button className="custom-btn__buy" onClick={()=>{clickBtnHandler('buy')}}>Mua ngay</button>
                        </div>
                    </div>

                </div>
            </div>
            {successNotifice && <SuccessNotifice />}
            {failNotifice && <FailNotifice />}
            {loadNotifice && <LoadNotifice />}
            {formNotifice && <FormNotifice />}
        </div>
    );
}

export default Detail;