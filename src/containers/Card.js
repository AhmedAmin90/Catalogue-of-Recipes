import React from 'react';
import './Card.css'

function Card({id , img , name , handleClick}) {   
    
    const handleCardClick = ()=>{
        handleClick(id)
    }
    return (
        <div onClick={handleCardClick} className="Card" style={{backgroundImage: `url(${img})`}}>
            <div className="Card-shadow">
                <h1 className="Card-name">{name}</h1>
            </div>
        </div>
    )
}

export default Card
