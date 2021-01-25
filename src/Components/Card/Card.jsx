import React from 'react'
import './Card.css'

export default props => {
    return (
        <div>

            <h3 className="cardTitle">{props.titulo}</h3>
            <div className="card" style={{ border: '5px solid' + props.mainColor}}>
                <img src={props.linkImg} style={{width: 100+'%', height: 100+'%'}}/>
            </div>
        </div>
    );
}
