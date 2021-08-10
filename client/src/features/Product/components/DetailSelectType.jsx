import './detailSelectType.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineCheckCircle } from "react-icons/hi";

DetailSelectType.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    soLuong: PropTypes.number,
    selects: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    available: PropTypes.number,
    valType: PropTypes.string,

    valueHandle: PropTypes.func,
    mouseOverHandle : PropTypes.func,

};

DetailSelectType.defaultProps = {
    title: "Hinh dang",
    type: 'select',   // select of input[type=number]  (select or input)
    soLuong: 0,
    selects: [
        {name:'shape1', image:'https://picsum.photos/611/511'},
        {name:'shape2', image:'https://picsum.photos/612/512'},
        {name:'shape3', image:'https://picsum.photos/613/512'},
        {name:'shape5asidijaskdasdas', image:'https://picsum.photos/614/512'},
    ],
    available: 0,
    valType: null,

    valueHandle:null,
    mouseOverHandle: null
}

function DetailSelectType(props) {
    //PROPS
    const {title, selects, type, soLuong, available, valType, valueHandle, mouseOverHandle} = props;

    //STATES
    const [active, setActive] = useState(-1);  //choosen select
    const [soLuongState, setSoLuongState] = useState(soLuong);

    // FUNCTION HANDLERS
    const clickHandler = (index)=>{
        setActive(index);
        if(valueHandle)
            valueHandle(valType, index);
    }
    const soLuongChangeHandler = (e)=>{
        setSoLuongState(e.target.value);
        if(valueHandle)
            valueHandle(valType, e.target.value);
    }



    if(type==='select')
        return (
            <ul className="detail__right__select">
                <li className="detail__right__select__title">{title}</li>
                <li className="grid">
                    <ul className="detail__right__select__list" >
                        {selects.map((select, index)=>(
                            <li key={select.name}
                                className={active === index ? 'detail__right__select__item detail__right__select__item--active' : 'detail__right__select__item'}
                                onClick={()=>{clickHandler(index)}}
                                onMouseOver={()=>{if(mouseOverHandle && active===-1) mouseOverHandle(select.image)}}>
                                {select.name}
                                <HiOutlineCheckCircle className={active === index ? 'detail__right__select__item__icon detail__right__select__item__icon--active' : 'detail__right__select__item__icon'} />
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        );
    if(type==='input')
        return(
            <ul className="detail__right__select">
                <li className="detail__right__select__title">{title}</li>
                <li className="grid">
                    <ul className="detail__right__select__list">
                        <li className="detail__right__select__item__input"><input onChange={soLuongChangeHandler} type="number" max="100" min="1" name="soLuong" value={soLuongState} /></li>
                        <li className="detail__right__select__item__available"><span> 90</span><span> sản phẩm có sẵn</span></li>
                    </ul>
                </li>

            </ul>
        )
}

export default DetailSelectType;