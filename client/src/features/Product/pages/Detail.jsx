import '../../../assets/scss/components/btn.scss';
import './detail.scss';

import React, { useRef, useState } from 'react';

import AddCartForm from '../components/AddCartForm';
import ImageShow from '../components/ImageShow';
import PropTypes from 'prop-types';
import { numberToCost } from '../../../assets/cores/cores';

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


function Detail(props) {
    // FORM
    const initialValues = {
        btnType:null,
        shape:null,
        color:null,
        soLuong:0,
    }
    // REF
    const formRef = useRef()
    // PROPS
    const {imgList, name, description, cost, shapes, colors, soLuong, likes, sold} = props;

    const [optionImg, setOptionImg] = useState('');


    // FUNCTION HANDLERS

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
                            <AddCartForm
                                initialValues={{shape:null, color:null, soLuong:0}}
                            />
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;