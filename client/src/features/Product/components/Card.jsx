import './card.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { linkStyle } from '../../../assets/styles/styles';
import { numberToCost } from '../../../assets/cores/cores';

Card.propTypes = {
    id: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    position: PropTypes.string,
    likes: PropTypes.number,
};

Card.defaultProps = {
    id: "123",
    img: null,
    description: null,
    cost: 0,
    position: null,
    likes:0
}

function Card(props) {
    const {id, img, description, cost, position, likes} = props;

    return (
        <div className="home-card c-2 t-3 m-4">
            <Link to={`/${id}/detail`} style={linkStyle}>
                <div className="card__img"> 
                    <img src={img} alt="" />
                </div>
                <div className="card__description custom-scroll">{description}</div>
                <div className="card__cost">{numberToCost(cost)}đ</div>
            </Link>
            <div className="card__heart">{likes}</div>
            
            <div className="card__position">{position}</div>
        </div>
    );
}

export default Card;