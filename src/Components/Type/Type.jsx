import React from 'react';
import {Link, withRouter} from "react-router-dom";
import './Type.css';
var axios = require('axios').default;
 class Type extends React.Component {
    state = {
        pokemon: [],
        id: 0,
        cart: []
    }


    componentDidMount(props) {
        axios.get(' https://pokeapi.co/api/v2/type/' + this.props.match.params.id).then((content) => {
            content.data.pokemon.forEach((qry) => {
                axios.get(qry.pokemon.url).then((result) => {
                    let arrayPokemon = [...this.state.pokemon]
                    arrayPokemon.push(result.data)
                    this.setState({pokemon: arrayPokemon, id:  this.props.match.params.id});
                })
            })
        })


    }





    render() {
        function addCart(id, name, price, linkImg , quantity , idType) {
            const objCart = { id: id, name: name, price: price, img: linkImg, quantity: quantity, idType: idType}

            let arrItems = [];
            if(localStorage.hasOwnProperty('cart')){
                arrItems = JSON.parse(localStorage.getItem('cart'))
                    arrItems.push(objCart)
                localStorage.setItem('cart' , [JSON.stringify(arrItems)]);
            }

            if(localStorage.getItem('cart') === null) {
                let arrItem = [];
                arrItem.push(objCart)
                localStorage.setItem('cart' , [JSON.stringify(arrItem)]);
            }
        }

        let id = this.state.id;
        let key = this.props.location.key

//
        return (
            <div className="contentType">

                {
                    this.state.pokemon.map(function(qry) {
                        return <React.Fragment>

                            <div className={`
                                    cardPokemons 
                                    ${id== 11 ? 'cardWater' : ''}
                                    ${id== 16 ? 'cardDragon' : ''}
                                    ${id == 13 ? 'cardEletric' : ''}
                                `} key={qry.id}>
                                <Link to={`/info/${qry.id}`}>
                                <div className="cardIMG">
                                    <img src={qry.sprites.other['official-artwork'].front_default} width={200} height={200}/>
                                </div>
                                <div className="cardContent">
                                    <h3>Nome: {qry.name}</h3>
                                    <h3>Preço: R$ {(qry.weight/qry.height).toFixed(2)} </h3>
                                </div>
                            </Link>
                                <div className="cardOptions">
                                    <button className="addCart" onClick={e => addCart(  qry.id, qry.name, (qry.weight/qry.height).toFixed(2), qry.sprites.other['official-artwork'].front_default ,1 , id  )}>+</button>
                                    <Link to={`/info/${qry.id}`}>
                                        <button className="btnInfoPokemon">Detalhes</button>
                                    </Link>
                                </div>
                            </div>

                        </React.Fragment>
                    })
                }

            </div>
        )
    }

}
export default withRouter(Type);
