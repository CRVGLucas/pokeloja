import React from 'react';
import './Search.css';
import queryString from 'query-string'
var axios = require('axios').default;
export default class Search extends React.Component {
    // be715ff4be56ea47a19e9f7bb3954557878872b9
    state = {
       pokemon: [],
       image: '',
       status: [],
       ability: [],
       type: [],
       arrayAbilities: []
    }

    componentDidMount(){
        let query = queryString.parse(this.props.location.search)
        axios.get('https://pokeapi.co/api/v2/pokemon/'+query.search).then((content) => {
            content.data.abilities.forEach(async (ability) => {
                await axios.get(ability.ability.url).then((ab) => {
                    let arrHab = [...this.state.arrayAbilities];
                    arrHab.push({name: ab.data.name, text: ab.data.flavor_text_entries[0]})
                    this.setState({arrayAbilities: arrHab});
                })
            })
            this.setState({
                pokemon: content.data,
                image: content.data.sprites.other['official-artwork'].front_default,
                status: content.data.stats,
                type: content.data.types
            });
        })

    }
    render() {

        function addCart(id, name, price, linkImg , quantity ) {
            const objCart = { id: id, name: name, price: price, img: linkImg, quantity: quantity}

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


       return (
          <div className="searchContent">
             <div className="imgContent">
                 <p><i className="btnBack" onClick={this.props.history.goBack}>Voltar</i></p>
                 <button className="addCart" onClick={e =>addCart(  this.props.id, this.props.pokemon.name, (this.props.pokemon.weight/this.props.pokemon.height).toFixed(2), this.props.pokemon.sprites.other['official-artwork'].front_default ,1 )}>+</button>
             </div>
             <div className="imgContent">
                     <p><img src={this.state.image}/></p>
             </div>
             <div className="infoContent">
                    <h2>{this.state.pokemon.name}</h2>
                    <p><b>altura:</b> {this.state.pokemon.height}</p>
                     <p><b>peso:</b> {this.state.pokemon.weight}</p>

                    {
                        this.state.status.map((status) => {
                            return (
                              <p><b>{status.stat.name}:  </b> {status.base_stat}</p>
                            );
                        })
                    }
                    <h2>Habilidades</h2>
                    {
                        this.state.arrayAbilities.map((hab) => {
                            return(
                                <div>
                                  <b className="txtHab">{hab.name}</b>
                                  <p>{hab.text.flavor_text}</p>
                                </div>
                            );
                        })
                    }
                    <h2>Tipo</h2>
                    {
                        this.state.type.map((type) => {
                            return(
                              <p>{type.type.name}</p>
                            );
                        })
                    }
                 </div>
          </div>
       );
    }

}
