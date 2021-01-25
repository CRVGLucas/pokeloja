import React from 'react';
import './Cart.css'
export default class Cart extends React.Component {
    state = {
        cart: [],
        totalPrice: 0
    }
    componentDidMount(){
        if(localStorage.getItem('cart') !== null ){
            this.setState({ cart: JSON.parse(localStorage.getItem('cart'))});
        }
    }


    render(){
        function incrementItem(id){
            console.log('id: ', id)
        }
        let preco = 0;
        this.state.cart.map(pokemon => {
            preco += parseFloat(pokemon.price)
            console.log('aasf: ', preco)
        })

        return(
            <div className="cartContent">
                <h1>CARRINHO</h1>
                <table className="cardTable">
                    <thead>
                        <tr>
                            <td></td>
                            <td>Nome</td>
                            <td>preço</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cart.map((content) => {
                            return(<tr key={content.id}>
                                <td><img src={content.img} width={100} height={100}/></td>
                                <td>{content.name}</td>
                                <td>R$ {content.price}</td>
                            </tr>);
                        })
                    }
                    </tbody>
                </table>
                <div className="totalPrice">
                    <p>Total: R$ {preco}</p>
                </div>
                <div className="finishBuy">
                    <p>Finalizar Compra</p>
                </div>
            </div>
        )
    }
}
