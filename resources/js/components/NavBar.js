import React, {Component} from 'react';
import { Navbar,Container, Nav, NavItem, NavDropdown, MenuItem ,Form} from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';
import ReactDrawer from 'react-drawer';
/* if you using webpack, should not apply identity to this css */
import 'react-drawer/lib/react-drawer.css'
import ShoppingBag from './ShoppingBag';
import 'rc-drawer/assets/index.css'
 //import { Drawer } from 'rsuite';
 import Drawer from 'rc-drawer';
class NavBar extends Component {
constructor (props){
        super(props);
        this.state={ category:[],cart:[],count:0,show: false, summedPrice:0, showInfo:false,showCat:false,total:0,subtotal:0 }
        this.toggleDrawer = this.toggleDrawer.bind(this);
    this.close=this.close.bind(this);
    this.toggleDrawer=this.toggleDrawer.bind(this);
    this.updateCart=this.updateCart.bind(this);
    this.removeCart=this.removeCart.bind(this);
    this.showInfo=this.showInfo.bind(this);
        }

componentDidMount(){
        axios.get('category')
        .then(response => {
         this.setState({ category: response.data,counter:response.data.counter});
        })
        .catch(function (error) {
         console.log(error);
         })
                
         }
handleOpen  () {
                
        this.setState({ showCat: true })       
        }
            
handleClose  () {
        this.setState({ showCat: false })
         }
close() {
        this.setState({
        show: false
                });
              }
toggleDrawer() {
 this.setState({ show: true });

 axios.get('cart')
        .then(response => {
       // console.log("cart is ",response.data.content,"count is",response.data.counter)
          this.setState({cart: Object.values(response.data.content),counter:response.data.counter} );
           })
           
        axios.get('subtotal')
        .then(response => {
       // console.log("cart is ",response.data.content,"count is",response.data.counter)
          this.setState({subtotal:response.data});
           })
         
        }
updateCart(id,qty){  
axios.post('update',{id:id,qty:qty})
        .then(response => {
         this.setState({ cart: Object.values(response.data.content),counter:response.data.counter });
              })
        .catch(function (error) {
         console.log(error);
              })
              axios.get('subtotal')
        .then(response => {
       // console.log("cart is ",response.data.content,"count is",response.data.counter)
          this.setState({subtotal:response.data});
           })
 
              }
removeCart(id){
        axios.post('remove',{id:id})
        .then(response => {
         this.setState({ cart: Object.values(response.data.content),counter:response.data.counter });
              })
        .catch(function (error) {
         console.log(error);
              })
              axios.get('subtotal')
        .then(response => {
       // console.log("cart is ",response.data.content,"count is",response.data.counter)
          this.setState({subtotal:response.data});
           })

}
showInfo() {
        this.setState({showInfo:!this.state.showInfo});
}
              
    render(){
        return (
               
                <div>        
                <div>
              <Drawer
              open={this.state.show}
              placement="right"
              handler={false}
               onClose={this.onClick}
            >
          
        <button className="btn float-right " style={{backgroundColor:"transparent",marginTop:"-12px"}} onClick={()=>{this.close()}} > <i style={{fontSize:"25px",color:"black"}} className="large material-icons">close</i> </button> 
        <h3 style={{marginTop:"20px",marginBottom:"20px",textAlign:"center"}}>Shopping Bag ({this.state.counter})   </h3>
       
             <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
             <h6  >Merchndise subtotal: &nbsp; &nbsp; <b>${this.state.subtotal}</b> 

             <button className="btn float-lg-right" onClick={e=>{this.showInfo()}} style={{backgroundColor:"transparent",border:"0",boxShadow:"none",outline:"none",marginTop:"-15px"}} >
             {!this.state.showInfo ? <i style={{fontSize:"25px",color:"black"}}   className="large material-icons">add</i>
                : <i style={{fontSize:"25px",color:"black"}}   className="large material-icons">remove</i>}
             </button>
             {this.state.showInfo && <p>  <small className="form-text text-muted">  <i style={{fontSize:"16px"}} className="medium material-icons">error_outline</i>
              Your merchandise subtotal does <br/> not yet include delivery charges nor taxes,if applicable,<br/> which will be reflected at Checkout.</small>    
              </p>}
             </h6>
        
      
      
              <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
              <button className=" btn-block" style={{backgroundColor:"#2C0F4D" }}>Proceed to Check Out</button>
              <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
             
                <div className="container">
                {this.state.cart.map((data,mykey)=>
                <div key={mykey}>
                <div className="row">  
                <div className="col-6">
                <p><b>DH Online Store</b> </p> 
                  <p>{data.name} </p>
                <p>Qty:<button className="btn" onClick={e=>{this.updateCart(data.id,-1)}} disabled={data.quantity==1} style={{backgroundColor:"transparent",border:"0",boxShadow:"none",outline:"none"}}><i style={{fontSize:"15px",margin:"1px",color:"black"}}   className="large material-icons">remove</i></button>
                {data.quantity}
                <button className="btn" onClick={e=>{this.updateCart(data.id,+1)}} disabled={data.quantity==data.attributes.stock} style={{backgroundColor:"transparent",border:"0",boxShadow:"none",outline:"none"}} ><i style={{fontSize:"15px",margin:"1px",color:"black"}}   className="large material-icons">add</i></button>
                </p>
                <p>Size: {data.attributes.size} </p>
                <b style={{color:'#2C0F4D'}}>${Math.round((data.price*data.quantity + Number.EPSILON) * 100) / 100}</b>
                <small className="form-text text-muted">${data.price} each</small>
                 </div>
                <div className="col-6" >
                <button className="btn float-right" onClick={e=>{this.removeCart(data.id)}} style={{backgroundColor:"transparent",border:"0",boxShadow:"none",outline:"none",marginTop:"-14px"}} ><i style={{fontSize:"15px",margin:"1px",color:"black"}}   className="large material-icons">close</i></button>
                 <img src={data.attributes.img} style={{width:"170px",height:"210px"}}></img>
                {/*} {this.data.stock>this.data.qty && this.setState({data.qty:data.stock})}*/}
                </div>
                </div>
                <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
                </div>
                )}
                </div>
                
    </Drawer>
    </div>
 <Navbar expand="lg" sticky="top" fixed="bottom" style={{ marginTop:"-65px",color:"white" ,backgroundColor:"#F1E4FF"}}>
  <Navbar.Brand href="#" style={{fontFamily:"Berkshire Swash, cursive"}}> DH Online Store</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="#/display-item">All products</Nav.Link>
       <NavDropdown  onMouseEnter = { this.handleOpen.bind(this) }
   onMouseLeave = { this.handleClose.bind(this) }
          show={ this.state.showCat }  title="Categories" id="collasible-nav-dropdown">
    {this.state.category.map((data,mykey)=>
        <NavDropdown.Item style={{fontSize:"15px"}} key={mykey} href={'#/category/'+data.id}> {data.name} </NavDropdown.Item>     
        )}
      </NavDropdown>
      <Nav.Link href="#/display-item">Semi-annual sale</Nav.Link>
    </Nav>
    
      <Nav.Link><i style={{fontSize:"25px"}}  onClick={this.toggleDrawer} disabled={this.state.open} className="large material-icons">shopping_bag</i></Nav.Link>
      <Nav.Link><i style={{fontSize:"25px"}} className="fa fa-user" aria-hidden="true"></i></Nav.Link>
      <Nav.Link><i style={{fontSize:"25px"}} className="fa fa-question-circle fa-1x" aria-hidden="true"></i></Nav.Link>
     
  
  </Navbar.Collapse>
</Navbar>
<div className="row">
        <div className="col-4">
                 </div>
        <div className="col-4"> 
        <img src="/images/cover.png" style={{width:"99%"}}></img>
        </div>
        <div className="col-4"> 
       
</div>


</div>
</div>
        );
}
}
export default NavBar;