import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import FootBar from './FootBar';
import  './styleDelila.css';
import {Button, Radio,ButtonToolbar, Modal} from 'react-bootstrap';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false};
        this.handleModal = this.handleModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
    }
    handleModal(){
        this.setState({show:!this.state.show});

    }
    closeModal(){
        this.setState({show:!this.state.show});
    }

render() {
    
  return (
      <div>
          <NavBar/>
          <Modal show={this.state.show} onHide={(e)=>{this.closeModal()}}  backdrop="static"
        keyboard={true}>
    <Modal.Header style={{backgroundColor:"black",color:"white"}} closeButton>
      <Modal.Title>Free Delivery over $150</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <small>
      <p>TO REDEEM OFFER:</p>
      <ul>
          <li> Add qualifying in-stock items totaling $150 USD or more to your shopping bag.</li>
          <li> Enter offer code DELIVER150 at checkout.</li>
          <li>Standard shipping & handling charges will automatically be deducted for eligible orders after offer code is applied.</li>
          <li>Valid March 27, 2019 through December 31, 2020 at 11:59pm PT.</li>
</ul>
<p>OFFER EXCLUDES THE FOLLOWING:</p>
<ul>
<li>Shipping & handling, taxes, gift cards, gift wrap & kits do not qualify towards the minimum purchase.</li>
<li> Not valid with any other shipping offers, previous purchases or store purchases.</li>
</ul>
<p>ADDITIONAL OFFER DETAILS:</p>
<ul>
<li>Valid for standard shipping & handling anywhere in select countries.</li>
<li>Offer subject to adjustment due to returns, cancellations and exchanges.</li>
<li>Offer may be modified or discontinued at any time without notice.</li>
</ul>
</small>
    </Modal.Body>
  </Modal>
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/coverSlogan.png" alt="Cover image text"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/cover.png" alt="Cover image logo"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/coverSlogan2.png" alt="Cover image logo"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

<div id="carousel" className="carousel" data-ride="carousel">
  <div className="carousel-inner">
    <div className= "carousel-item active">
     <a href="#/display-item"> <img className="d-block w-100" src="/images/discount2.png" alt="Discount"/> </a>
    </div>
  </div>
</div>
<div id="carousel" className="carousel" data-ride="carousel">
  <div className="carousel-inner">
    <div className= "carousel-item active">
     <a href="#/display-item"> <img className="d-block w-100" src="/images/flayer.png" alt="Discount sale"/> </a>
    </div>
  </div>
</div>
<div className="row" style={{marginTop:"20px", marginBottom:"20px"}}>
    <div className="col-4">
    <a id="homeButton" href="#"><i className="fa fa-truck fa-2x" aria-hidden="true" style={{color:"#2C0F4D",marginRight:"6px"}}></i>SHIPPING OPTIONS</a>
    </div>
    <div className="col-4">
    <a id="homeButton" href="#"><i className="fa fa-exchange fa-2x" aria-hidden="true" style={{color:"#2C0F4D",marginRight:"6px"}}></i>RETURNS INFORMATION</a>
        </div>
        <div className="col-4">
       <a id="homeButton" href="#"><i className="fa fa-lock fa-2x" aria-hidden="true" style={{color:"#2C0F4D",marginRight:"6px"}}></i>SECURE PAYMENT
       </a> 
        </div>

</div>
<div id="carousel" className="carousel" data-ride="carousel">
  <div className="carousel-inner">
    <div className= "carousel-item active">
     <a onClick={e=>{this.handleModal()}} > <img className="d-block w-100" src="/images/freeDelivery.png" alt="Discount sale"/> </a>
    </div>
  </div>
</div>
<FootBar/>
</div>
  )
  }
}
export default Homepage;