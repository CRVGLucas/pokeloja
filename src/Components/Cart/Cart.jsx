import React from 'react';
import './Cart.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.finishBuy = this.finishBuy.bind(this);
    }
    state = {
        cart: [],
        totalPrice: 0,
        cartItems : []
    }

    componentDidMount(){
        var originalSetItem = localStorage.setItem;
        var arrayItems = [];
        //GUARDA O CARRINHO ATUAL
        let saveCart = (cart) => {
            this.setState({cart: cart});
        }
        //ESSA FUNÇÃO CRIA O EVENTO QUE É CHAMADO TODA VEZ QUE O LOCALSTORAGE É ALTERADO
        localStorage.setItem = function(){
            document.createEvent('Event').initEvent('itemInserted', true, true);
            originalSetItem.apply(this, arguments);
           saveCart(JSON.parse( localStorage.getItem('cart') ))
        };
        if(localStorage.getItem('cart') !== null ){
            this.setState({ cart: JSON.parse(localStorage.getItem('cart'))});
        }
    }
    finishBuy(){
        localStorage.removeItem('cart');
        this.setState({cart: []});
        toast.success("Compra finalizada !!!");
    }

    render(){

        let preco = 0;
        this.state.cart.map(pokemon => {
            preco += parseFloat(pokemon.price)
        })



        if(JSON.parse(localStorage.getItem('cart')) !== null){
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
                    <div className="finishBuy" onClick={e => this.finishBuy()}>
                        <p >Finalizar Compra</p>
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
        }else{
            return (<div></div>);
        }
    }
}
