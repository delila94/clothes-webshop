import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import NavBar from './NavBar'
import FootBar from './FootBar'
import ReactImageMagnify from 'react-image-magnify';
import {Button, Radio,ButtonToolbar, Modal} from 'react-bootstrap';
import {InputLabel,Select,MenuItem,NativeSelect,FormControl,Input} from '@material-ui/core';

class OneProduct extends Component {
  constructor(props) {
      super(props);
      this.state = {products:{},cart:[],qty:1,show:false,open: false,error:false,size:[],oneSize:''};
      this.handleCart = this.handleCart.bind(this);
      this.closeModal=this.closeModal.bind(this);
      this.qty=this.qty.bind(this);
      this.size=this.size.bind(this);
  }


  componentDidMount(){
    axios.post('show',{id:this.props.params.id})
    .then(response => {
      this.setState({ products: response.data.product ,stock:response.data.product.stock, size:response.data.size});
       //here you can access size
    })
    .catch(function (error) {
      console.log(error);
    })
    
  }
  qty(e){
    e.preventDefault();
    this.setState({qty:e.target.value});

  }
  size(e){
    e.preventDefault();
    this.setState({oneSize:e.target.value});

  }
  handleCart (e,id,qty,oneSize) {
    e.preventDefault();
    if(this.state.oneSize=='' || this.state.oneSize=='Please select size')
    { 
      this.setState({oneSize:"Please select size"})
    }
    else {
      //add only if user chose size
      axios.post('add',{id:id,qty:qty,oneSize:oneSize})
      this.setState({show:!this.state.show});
      
    }
     // axios.post('updateStock',{id:id,stock:qty})
    //  .then(response => {
    //    this.setState({ stock: response.data },console.log(response));
   //   })
     // this.setState() //when user have done check out in db stock should be reduced


  }
  closeModal() {
     this.setState({show:!this.state.show});
   
  }

  render(){
    var i; //this is array for displaying quantity depending on stock
    let array=[]; //form empty array and fill it with numbers with limit of stock
for (i = 1; i <= this.state.stock; i++) {
   array[i]=i;
}
if(this.state.stock==0) {
  array=[0]; //set error to true to display appropriate message to user
   } //if there is no item on stock to prevent errors
    return (
        <div>
        <NavBar/> {/*this is for including header */}
        <div className="container" >
        <Modal show={this.state.show} onHide={()=>{this.closeModal()}} keyboard={true}>
    <Modal.Header closeButton> {/* pop up modal when item is added to cart */}
      <Modal.Title>Shopping cart</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Item added to your cart.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary"onClick={()=>{this.closeModal()}}>Continue Shopping </Button>
      <Button variant="primary">Go to Checkout</Button>
    </Modal.Footer>
  </Modal>
  <div className="row"style={{marginTop:"30px"}}>
  <div className="col-6">
    {/*this is plugin for zooming image */}
<ReactImageMagnify {...{ 
    smallImage: {
        isFluidWidth: true,
        src: this.state.products.imgZoom,
    
    },
    largeImage: {
        src: this.state.products.imgZoom,
        width: 1200,
        height: 1600,
    }
    ,style:{
        zIndex:"10"
    }
}} />

<p> <i style={{fontSize:"20px"}} className="large material-icons">zoom_in</i>Click on image to enlarge </p>
</div>
<div className="col-6" >
DH Online Store <br/> <br/>

<h1><b>{this.state.products.item}</b></h1>
       <p >${this.state.products.price}</p>
   

<p><b style={{marginRight:"7px"}}>Size:</b>{this.state.oneSize}</p>
{this.state.size.map((data,mykey)=>
        <div key={mykey} id={data.id} class="btn-group btn-group-toggle" data-toggle="buttons">
  
  <label class="btn btn-light " style={{marginRight:"4px"}}>
    <input type="radio" onClick={(e)=> {this.size(e)}} name="options" id={data.size} value={data.size} autocomplete="off" checked/> {data.size}
  </label>
          </div>
)}



       <p style={{marginTop:"10px"}}>In Stock: {this.state.products.stock}</p>     
<InputLabel htmlFor="select"><b>Quantity </b></InputLabel> {/*select quantity max number is number in stock */}
<NativeSelect id="select" onChange={(e)=> {this.qty(e)}}>
  {array.map((number) => (
            <option key={number} value={number} >
              {number}
              </option>
        
          ))}
</NativeSelect> <br/>
{this.state.products.stock==0 && <small style={{color:"red"}}>Currently this item is out of stock</small>}
       <br/>
       <button type="submit" disabled={this.state.products.stock==0 } className="btn btn-lg btn-block" style={{backgroundColor:"#2C0F4D" }} onClick={(e)=>{this.handleCart(e,this.state.products.id,this.state.qty,this.state.oneSize)}}>Add to Bag</button>
       <small><i style={{fontSize:"13px"}} className="large material-icons">sync</i>Returns and exchange information.<a href='#'>Details</a></small>
       <br/> <br/>
       <h4>Description</h4>
       {this.state.products.description}
 </div>
        </div>
    
    </div>  
    <FootBar/>
    </div>
    )
  }
}
export default OneProduct;