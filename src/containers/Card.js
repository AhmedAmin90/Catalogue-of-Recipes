import React from 'react';
import './Card.css'

const Card = ({ img , name }) => {   
    
    return (
        <div className="Card" style={{backgroundImage: `url(${img})`}}>
            <div className="Card-shadow">
                <h1 className="Card-name">{name}</h1>
            </div>
        </div>
    )
}

export default Card
