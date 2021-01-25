import React from 'react';
import './InfoPokemon.css';
var axios = require('axios').default;

export default class InfoPokemon extends React.Component {
    state = {
        pokemon: [],
        image: '',
        status: [],
        ability: [],
        arrayHab: []
    }
    componentDidMount(props) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`).then((query) => {
            console.log('query.data', query.data);

            query.data.abilities.forEach(async (ab) => {

                //effect_entries[1].short_effect
                const hab = await axios.get(ab.ability.url);
                //arra.push({ txtHab: hab.data.flavor_text_entries[2].flavor_text, txtEfeito: hab.data.effect_entries[1].short_effect})
                //let obj = Object.assign(query.data.abilities, {
                    //txtHab: hab.data.flavor_text_entries[2].flavor_text,
                    //txtEfeito: hab.data.effect_entries[1].short_effect
               // })
                let ata = {}

                let apafsp = Object.assign(query.data.abilities, {
                    txtHab: hab.data.flavor_text_entries[2].flavor_text,
                    txtEfeito: 'hab.data.effect_entries[1].short_effect'
                })
                this.setState({
                    pokemon: query.data,
                    status: query.data.stats,
                    ability: query.data.abilities,
                    image: query.data.sprites.other['official-artwork'].front_default,
                    arrayHab: {
                        txtHab: hab.data.flavor_text_entries[2].flavor_text,
                        txtEfeito: 'hab.data.effect_entries[1].short_effect'
                    }
                });
                console.log('ABILITIES', query.data.abilities)
                console.log('obj aqui: ', apafsp);
            })
        });
    }

    render(){

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
        return(
            <div className="infoContent">
                <div className="leftDiv">
                    <i className="btnBack" onClick={this.props.history.goBack}>Voltar</i>
                    <button className="addCart" onClick={e =>addCart(  this.props.id, this.props.pokemon.name, (this.props.pokemon.weight/this.props.pokemon.height).toFixed(2), this.props.pokemon.sprites.other['official-artwork'].front_default ,1 )}>+</button>
                </div>

                <div>
                    <img src={this.state.image}/>
                </div>
                <div>
                    <h1>{this.state.pokemon.name}</h1>
                    <p>Altura: {this.state.pokemon.height}</p>
                    <p>Peso: {this.state.pokemon.weight}</p>
                    <p>Experiência: {this.state.pokemon.base_experience}</p>
                    {this.state.status.map((data,index) => {
                        return(<div key={index}><b>{data.stat.name}</b> {data.base_stat}</div>);
                    })}
                    <h4>Habilidades</h4>
                    {this.state.ability.map((data,index) => {
                        return (
                            <div key={index}>
                                {data.ability.name}
                                <p>{this.state.arrayHab.txtHab}</p>
                            </div>
                        )
                    })}
                </div>



            </div>
        )
    }
}
