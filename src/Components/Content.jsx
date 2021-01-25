import  React , {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home/Home";
import Type from "./Type/Type";
import Info from "./Info/InfoPokemon"
import Cart from './Cart/Cart';


export default props => {
    return(
        <div style={{backgroundColor: '#fff', height: 100+'vh'}}>
            <Router >
                <Switch>
                    <Route exact path="/" component={ withRouter(Home) } />
                    <Route  exact path='/tipo/:id' component={ withRouter(Type) }/>
                    <Route exact path='/info/:id' component={ withRouter(Info) }/>
                    <Route exact path='/cart' component={ withRouter(Cart) }/>
                </Switch>
            </Router>
        </div>
    );
}


