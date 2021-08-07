import './imageShow.scss';

import PropTypes from 'prop-types';
import React, { useState } from 'react';

ImageShow.propTypes = {
    imgList: PropTypes.array,
}
ImageShow.default = {
    imgList: [],
}

function ImageShow(props) {
    //PROPS
    const {imgList} = props;
    //STATEs
    const [showImage, setShowImage] = useState(imgList[0]);
    // FUNCTION HANDLERS
    const mouseOverHander = (img)=>{
        setShowImage(img);
    }

    return (
        <>
            <div className="image-show">
                <img src={showImage} alt="loading" />
            </div>
            <ul className="image-list custom-scroll">
                {imgList.map(img => (
                    <li className="image-list__item" onMouseOver={()=>{mouseOverHander(img)}}><img src={img} alt="loading" /></li>
                ))}
            </ul>  
        </>
    )}
export default ImageShow