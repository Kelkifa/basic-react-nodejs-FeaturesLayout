import './cartPage.scss';
import 'assets/scss/components/btn.scss';

import React from 'react';
import Table from 'components/Table/Table';
import { numberToCost } from 'assets/cores/cores';
import { useSelector } from 'react-redux';

function CartPage(props) {
    const carts = useSelector(state => state.carts);

    if(carts.loading)
        return(
            <div className="cart-page grid wide">
            </div>
        )

    if(carts.error)
        return(
            <div className="cart-page grid wide">
                {carts.error}
            </div>
        )


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
                    {/* <Table theaders={[
                                '',
                                'Sản phẩm',
                                'Mô tả',
                                'Hình dáng',
                                'Màu sắc',
                                'Đơn giá',
                                'Số lượng',
                                'Thành tiền',
                                'Lưa chọn'
                            ]
                        }
                    >
                        {carts.carts.map(cart => (
                            <tr key={cart._id}>
                                <td><input type="checkbox" /></td>
                                <td>{cart.name}</td>
                                <td>{cart.description}</td>
                                <td>{cart.shape}</td>
                                <td>{cart.color}</td>
                                <td className="cost-style">{numberToCost(cart.cost)}</td>
                                <td>{cart.soLuong}</td>
                                <td>{numberToCost(cart.cost * cart.soLuong)}</td>
                                <td>
                                    <a href="/asd" onClick={(e)=>{e.preventDefault()}}>
                                        delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                        
                    </Table> */}
                </div>
            </div>
        </div>
    );
}

export default CartPage;