import './imageShow.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { set } from 'mongoose';

ImageShow.propTypes = {
    imgList: PropTypes.array,
    optionImg: PropTypes.string,
}
ImageShow.default = {
    imgList: [],
    optionImg: null
}

function ImageShow(props) {
    //PROPS
    const {imgList, optionImg} = props;
    
    //STATES
    const [showImage, setShowImage] = useState(imgList[0]);  // image item is showed
    const [active, setActive] = useState(-1);   // border for image list

    useEffect(()=>{
        if(optionImg)
            setShowImage(optionImg);
    },[optionImg])
    // FUNCTION HANDLERS
    const mouseOverHander = (img, index)=>{
        setShowImage(img);
        setActive(index);
    }

    return (
        <>
            <div className="image-show">
                <img src={showImage} alt="loading" />
            </div>
            <ul className="image-list custom-scroll">
                {imgList.map((img, index) => (
                    <li key={img+index} className={
                        active === index ? 
                        "image-list__item image-list__item--active" : "image-list__item"
                     }
                     onMouseOver={()=>{mouseOverHander(img, index)}}>
                         <img src={img} alt="loading" />
                    </li>
                ))}
            </ul>  
        </>
    )}
export default ImageShow