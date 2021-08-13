import './card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { numberToCost } from '../../../assets/cores/cores';
import { Link } from 'react-router-dom';
import { linkStyle } from '../../../assets/styles/styles';

Card.propTypes = {
    id: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    position: PropTypes.string,
    heart: PropTypes.number,
};

Card.defaultProps = {
    id: "123",
    img: null,
    description: null,
    cost: 0,
    position: null,
    heart:0,
}

function Card(props) {
    const {id, img, description, cost, position, heart} = props;

    return (
        <div className="home-card c-2 l-3 t-3 m-5">
            <Link to={`/${id}/detail`} style={linkStyle}>
                <div className="card__img"> 
                    <img src={img} alt="" />
                </div>
                <div className="card__description custom-scroll">{description}</div>
                <div className="card__cost">{numberToCost(cost)}đ</div>
            </Link>
            <div className="card__heart">{heart}</div>
            
            <div className="card__position">{position}</div>
        </div>
    );
}

export default Card;