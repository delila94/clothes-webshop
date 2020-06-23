import React, {Component} from 'react';
import axios from 'axios';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';
import NavBar from './NavBar';
import Card from 'react-bootstrap/Card'
import { Link, hashHistory } from 'react-router';
import FootBar from './FootBar';
class DisplayCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {products: [],category:[],   _isMounted: false};
        
      }
      componentDidMount(){
       
        axios.post('showCat',{id:this.props.params.id})
        .then(response => {
          this.setState({ category: response.data });
        })
      
      }
      componentDidUpdate(){
     
        axios.post('showCat',{id:this.props.params.id})
        .then(response => {
          this.setState({ category: response.data });
        })
      }
      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
      mouseEnter () {
        this.setState({ isMouseInside: true });
        //console.log("enter",this.state.isMouseInside);
      }
      mouseLeave () {
        this.setState({ isMouseInside: false });
      }
      render(){
        return (
            <div>
                <NavBar/>
            <div className="container" style={{marginTop:"30px"}}>
            <h5>Products</h5>
            <br />
    
            <div className="row justify-content-center">
        {this.state.category.map((data,mykey)=>
        <div key={mykey} id={data.id} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
               <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.imgZoom} />
        {this.state.isMouseInside ?  <Link to={"product/"+data.id} className="btn btn-primary">View</Link>  : null}
            
        <Card.Body>
          <Card.Title><b>{data.item}</b></Card.Title>
          <Card.Text>    
          {data.price}$
          
          </Card.Text>
          <Link to={"product/"+data.id} className="btn btn-primary">Quick View</Link>
        </Card.Body>
      </Card>
      </div>               
            )}
           </div>
            </div>  
            <FootBar/>
            </div>
        )
      }
    }
export default DisplayCategory;