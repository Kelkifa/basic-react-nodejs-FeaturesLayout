import './home.scss';

import Card from '../components/Card';
import React from 'react';

Home.propTypes = {
    
};

function Home(props) {

    return (
        <div className="grid wide home-page">
            <ul className="home__navbar row-c10 cg-0 c-12">
                <li className="home__navbar__item c-2" >Dạo</li>
                <li className="home__navbar__item c-2" >Tất cả</li>
                <li className="home__navbar__item c-2" >Tiện ích</li>
                <li className="home__navbar__item c-2" >Mô hình</li>
                <li className="home__navbar__item c-2" >Hàng mới về</li>
            </ul>
            <div className="home__content row cg-0">
                <ul className="home__content__leftbar c-2 t-0 m-0">
                    <li className="home__content__leftbar__title">Danh mục</li>
                    <li className="home__content__leftbar__item">Sản phẩm</li>
                    <li className="home__content__leftbar__item">Tiện ích</li>
                    <li className="home__content__leftbar__item">Mô hình</li>
                    <li className="home__content__leftbar__item">Hàng mới</li>
                </ul>
                <div className="home__content__right c-10 t-12 m-12">
                    <div className="home__content__right__sort">
                        <div className="grid wide-p97">
                            <ul className="row-c10">
                                <li className="c-2">Sắp xếp theo</li>
                                <li className="c-2"><div className="home__content__right__sort__btn">Phổ biến</div></li>
                                <li className="c-2"><div className="home__content__right__sort__btn">Mới nhất</div></li>
                                <li className="c-2"><div className="home__content__right__sort__btn">Bán chạy</div></li>
                                <li className="c-2"><div className="home__content__right__sort__btn">Giá</div></li>
                            </ul>
                        </div>
                    </div>
                    <div className="home__content__right__cards">
                        <div className="grid wide-p97">
                            <div className="row-c10">
                                <Card img="https://picsum.photos/500/400"
                                    description="anh dep"
                                    cost={300000}
                                    position="Đồng Nai" 
                                />
                                <Card img="https://picsum.photos/500/400"
                                    description="anh dep"
                                    cost={300000}
                                    position="Đồng Nai" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;