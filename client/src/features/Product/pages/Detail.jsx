
import './detail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ImageShow from '../components/ImageShow';

Detail.propTypes = {
    imgList: PropTypes.array,
    name: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    shapes: PropTypes.array,
    colors :PropTypes.array,
    soLuong: PropTypes.number,
    likes: PropTypes.number,
    sold : PropTypes.number,
    
};

Detail.defaultProps = {
    imgList: ["https://picsum.photos/500/501","https://picsum.photos/500/500","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503","https://picsum.photos/500/503"],
    name: null,
    description: null,
    cost: 0,
    shapes: [],
    colors : [],
    soLuong: 0,
    likes: 0,
    sold : 0,
}

function Detail(props) {
    const {imgList, name, description, cost, shapes, colors, soLuong, likes, sold} = props;
    return (
        <div className="detail-page">
            <div className="grid wide detail">
                <div className="row">
                    <div className="c-6 detail__left">
                        <ImageShow imgList={imgList} />
                    </div>

                    <div className="c-6 detail__right">


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;