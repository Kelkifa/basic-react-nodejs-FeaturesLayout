import '../../../assets/scss/components/btn.scss';
import './detail.scss';

import React, { useEffect, useRef, useState } from 'react';

import AddCartForm from '../components/AddCartForm';
import ImageShow from '../components/ImageShow';
import { numberToCost } from '../../../assets/cores/cores';
import productApi from 'api/productApi';
import { useParams } from 'react-router-dom';

// Detail.propTypes = {
//     id: PropTypes.string,
//     name: PropTypes.string,
//     imgList: PropTypes.array,
//     description: PropTypes.string,
//     cost: PropTypes.number,
//     shapes: PropTypes.array,
//     colors :PropTypes.array,
//     soLuong: PropTypes.number,
//     likes: PropTypes.number,
//     sold : PropTypes.number,
    
// };

// Detail.defaultProps = {
//     id: null,
//     name: null,
//     imgList: [],
//     description: null,
//     cost: 0,
//     shapes: [],
//     colors : [],
//     soLuong: 0,
//     likes: 0,
//     sold : 0,
// }
// Detail.defaultProps = {
//     id: '61016070c895a3230806395c',
//     name: "Chậu hoa",
//     imgList: ["https://picsum.photos/500/501","https://picsum.photos/500/500","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503"],
//     description: "Mô tả chậu hoa",
//     cost: 100000,
//     shapes: [
//         {name:'shape1',image:'https://picsum.photos/600/599'},
//         {name:'shape2',image:'https://picsum.photos/700/560'}
//     ],
//     colors : [
//         {name:'color1',image:'https://picsum.photos/601/599'},
//         {name:'color2',image:'https://picsum.photos/701/560'}
//     ],
//     soLuong: 0,
//     likes: 0,
//     sold : 0,
// }


function Detail(props) {
    // PARAMS
    const {id : idParam} = useParams();
    console.log({idParam});
    // FORM
    const initialValues = {
        btnType:null,
        shape:null,
        color:null,
        soLuong:0,
    }
    // REF
    const formRef = useRef()

    const [optionImg, setOptionImg] = useState('');
    // STATE
    const [productInfo, setProductInfo] = useState({
        isLoading: true,
        error:null,
        product:null,
    });

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const response = await productApi.getOne({id:idParam});
                console.log(response);
                if(response.success === true){
                    setProductInfo({
                        isLoading: false,
                        error: false,
                        product: response.response
                    });
                }
            }catch(err){
                setProductInfo({
                    isLoading: false,
                    error: err.message ? err.message : true,
                    product: null,
                })
            }
        }
        fetchProduct();
    },[])

    // FUNCTION HANDLERS

    return (
        <div className="detail-page">
            <div className="grid wide detail">
                {!productInfo.isLoading && !productInfo.error ? 
                <div className="row cg-15">
                    <div className="c-6 t-12 detail__left">
                        <ImageShow 
                            imgList={productInfo.product.img} 
                            optionImg={optionImg} 
                        />
                    </div>

                    <div className="c-6 t-12 detail__right">
                        <div className="detail__right__name">{productInfo.product.name}</div>

                        <div className="detail__right__sold">
                            <span>Chưa có đánh giá</span><span> | </span><span>{productInfo.product.sold}</span><span> đã bán</span>
                        </div>
                        <div className="detail__right__description custom-scroll">{productInfo.product.description}</div>

                        <div className="detail__right__cost">{numberToCost(productInfo.product.cost)}đ</div>
                            <AddCartForm
                                initialValues={{shape:null, color:null, soLuong:0, productId:idParam}}
                                shapes={productInfo.product.shapes}
                                colors={productInfo.product.colors}
                                productId={idParam}
                            />
                        <div>

                        </div>
                    </div>
                </div>
                    :
                    ''
            }
                
            </div>
        </div>
    );
}

export default Detail;