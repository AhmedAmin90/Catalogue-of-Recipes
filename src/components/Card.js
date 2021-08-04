import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ img, name }) => (
  <div className="Card" style={{ backgroundImage: `url(${img})` }}>
    <div className="Card-shadow">
      <h1 className="Card-name">{name}</h1>
    </div>
  </div>
);

Card.defaultProps = {
  img: '',
  name: '',
};

Card.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

export default Card;
