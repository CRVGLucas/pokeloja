import React from 'react';
import './InfoPokemon.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var axios = require('axios').default;


export default class InfoPokemon extends React.Component {
    state = {
        pokemon: [],
        image: '',
        status: [],
        abilities: [],
        arrayHab: [],
        idType: 0
    }
    componentDidMount(props) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`).then((query) => {
            console.log('query.data', query.data);
            axios.get(query.data.types[0].type.url).then((content) => {
                this.setState({idType: content.data.id});
            });
            this.setState({
                pokemon: query.data,
                status: query.data.stats,
                ability: query.data.abilities,
                image: query.data.sprites.other['official-artwork'].front_default,
            });
            query.data.abilities.forEach(async (ability) => {
                await axios.get(ability.ability.url).then((ab) => {
                    let arrHab = [...this.state.abilities];
                    arrHab.push({name: ab.data.name, text: ab.data.flavor_text_entries[0]});
                    //console.log('habilidade: ', {name: ab.data.name, text: ab.data.flavor_text_entries[0]})
                    this.setState({abilities: arrHab});
                })
            })

        });
    }

    render(){

        function addCart(id, name, price, linkImg  ) {

            const objCart = { id: id, name: name, price: price, img: linkImg}
            toast.success(name + " foi adicionado ao carrinho!")

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



            <div className="infoPokemonContent">
                <div className="leftDiv">
                    <i className="btnBack" onClick={this.props.history.goBack}>Voltar</i>
                    <button className="addCart" onClick={e =>addCart(  this.state.id, this.state.pokemon.name, (this.state.pokemon.weight/this.state.pokemon.height).toFixed(2), this.state.pokemon.sprites.other['official-artwork'].front_default )}>+</button>
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
                    {this.state.abilities.map((data,index) => {
                        return (
                            <div key={index}>
                                <b>{data.name}</b>
                                <p>{data.text.flavor_text}</p>
                            </div>
                        )
                    })}
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    type="success"
                    draggable
                    pauseOnHover
                />
            </div>

        )
    }
}
