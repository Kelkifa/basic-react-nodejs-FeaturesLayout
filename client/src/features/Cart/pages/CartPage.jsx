import './cartPage.scss';
import 'assets/scss/components/btn.scss';

import React from 'react';
import Table from 'components/Table/Table';
import productApi from 'api/productApi';
import { useSelector } from 'react-redux';

function CartPage(props) {
    const carts = useSelector(state => state.carts);

    // HANDLER FUNCTIONS
    const testRequestClickHandler = async ()=>{
        try{
            const response = await productApi.getAll();
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="cart-page grid wide">
            <div className="row cart__group">
                <div className="c-12 cart__control">
                    <div className="cart__control__left">
                        <input type="checkbox" />
                        <div>Chọn tất cả</div>
                    </div>
                    <div className="cart__control__right">
                        <div>Tổng số lượng sản phẩm</div>
                        <div><span>(</span><span>0</span><span> sản phẩm)</span></div>
                        <div className="cart__control__right__cost">0đ</div>
                        <button className="cart__control__right__buy custom-btn__buy">Mua ngay</button>
                    </div>
                </div>
            </div>
            <div className="row cart__group">
                <div className="c-12 cart__table">
                    <Table></Table>
                </div>
            </div>
            
            <button onClick={testRequestClickHandler}>request to product</button>
        </div>
    );
}

export default CartPage;