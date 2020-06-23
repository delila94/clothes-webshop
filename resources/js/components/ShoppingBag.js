import React, {Component} from 'react';
import { Navbar,Container, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';
import ReactDrawer from 'react-drawer';
/* if you using webpack, should not apply identity to this css */
import 'react-drawer/lib/react-drawer.css'

class ShoppingBag extends Component {
    constructor (props){
        super(props);
        this.state={ category:[],cart:[],show: false,open: false }
        }
    componentDidMount(){
        axios.get('cart')
        .then(response => {
          this.setState({cart: Object.values(response.data) },()=>console.log("cart is ",response.data));
           })
          .catch(function (error) {
                  console.log(error);
                })
    }
    render(){
        return (
            <div>
            <h2 style={{marginTop:"20px",marginBottom:"20px"}}>Shopping Bag</h2>
                <div className="container">
                {this.state.cart.map((data,mykey)=>
                <div className="row align-items-center">
                <div class="col">
                <b>DH Online Store</b>
                <p>{data.name}</p>
                <p>Qty:{data.quantity}</p>
                <p><b>{data.price}</b></p>
                <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
                </div>
                </div>
                )}
                </div>
                <button>Check Out</button>
                </div>
        );
    }


}
export default ShoppingBag;