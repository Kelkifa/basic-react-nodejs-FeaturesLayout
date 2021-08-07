import './card.scss';
import React from 'react';
import PropTypes from 'prop-types';

Card.propTypes = {
    img: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    position: PropTypes.string,
    heart: PropTypes.number,
};

Card.defaultProps = {
    img:null,
    description:null,
    cost: 0,
    position:null,
    heart:0,
}

function Card(props) {
    const {img, description, cost, position, heart} = props;

    return (
        <div className="home-card c-2 l-3 t-3 m-5">
            <div className="card__img"> 
                <img src={img} alt="" />
            </div>
            <div className="card__description">{description}</div>
            <div className="card__cost">{cost}</div>
            <div className="card__heart">{heart}</div>
            <div className="card__position">{position}</div>
        </div>
    );
}

export default Card;