import React from 'react';
import './Menu.css';
import { BrowserRouter as Router, Link} from "react-router-dom";

export  default  () => {
    return(
        <div className="menu">
                <Link to={'/'}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg" style={{ width: 80+'px', height: 80+'px'}}/>
                </Link>
                <form method="GET" action="/busca/">
                    <input type="text" name="search" placeholder="Buscar por..." className="searchMenu"/>
                </form>
        </div>
    );
}
