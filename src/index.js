import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Components/Home/Home'
import reportWebVitals from './reportWebVitals';
import{ BrowserRouter , Switch, Route} from "react-router-dom";
import Menu from './Components/Menu/Menu';
import Type from './Components/Type/Type';
import InfoPokemon from './Components/Info/InfoPokemon';
import Cart from "./Components/Cart/Cart";
import Search from './Components/Search/Search';

ReactDOM.render(
    <BrowserRouter>
        <Menu/>
        <div className="content">
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/tipo/:id" component={Type} />
                <Route path="/info/:id" component={InfoPokemon} />
                <Route path="/busca/:query" component={Search} />
            </Switch>
            <Cart/>
        </div>

    </ BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
