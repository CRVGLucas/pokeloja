import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './Home.css';
import Card from '../Card/Card'
const axios = require('axios').default
export default props => {
    return(
           <div className="contentHome">

                   <Link to="/tipo/11">
                       <Card type={11} titulo="Água" mainColor="#89E6EB" linkImg="https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2017/03/legiao_ODAl0cCdK4_n7ENMXsUetbWVB6LkzZu1orHiGhRg2J.jpg.jpeg"/>
                   </Link>
                   <Link to="/tipo/16">
                       <Card type={16} titulo="Dragão" mainColor="#432F91" linkImg="http://4.bp.blogspot.com/-xPyQrxwnodI/VHXAeU4Ua1I/AAAAAAAABvE/AM_yTsrIrG4/s1600/n50f4b061e3036.jpg"/>
                   </Link>
                   <Link to="/tipo/13">
                       <Card type={13} titulo="Elétrico" mainColor="#F0DD0C" linkImg="http://a3.ec-images.myspacecdn.com/images02/133/34ceb5c855454b539f7a6acca0eeb027/l.jpg"/>
                   </Link>
                   <Link to="/tipo/10">
                       <Card type={10} titulo="Fogo" mainColor="#FA2204" linkImg="https://images.uncyc.org/pt/9/94/Pkmnfire.png"/>
                   </Link>
                   <Link to="/tipo/12">
                       <Card type={12} titulo="Gelo" mainColor="#C8E8F5" linkImg="https://criticalhits.com.br/wp-content/uploads/2019/12/pokemon-go-evento-natal-2019.jpg"/>
                   </Link>

           </div>
    );
}
