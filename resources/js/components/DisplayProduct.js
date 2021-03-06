/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Card from 'react-bootstrap/Card';
import NavBar from './NavBar';
import FootBar from './FootBar';

class DisplayProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get('product')
      .then((response) => {
        this.setState({ products: response.data });
      });
    /* axios.post('showCat',{id:'3'})
        .then(response => {
          this.setState({ category: response.data },()=>{console.log(response.data)});
        })
        .catch(function (error) {
          console.log(error);
        }) */
  }

  /* mouseEnter () {
        this.setState({ isMouseInside: true });
       // console.log("enter",this.state.isMouseInside);
      }
      mouseLeave () {
        this.setState({ isMouseInside: false });
      } */
  // {this.state.isMouseInside ?  <Link to={"product/"+data.id}
  // className="btn btn-primary">View</Link>  : null}
  render() {
    return (
      <div>
        <NavBar />

        <div className="container">
          <h5>Products</h5>
          <br />

          <div className="row justify-content-center">
            {this.state.products.map((data, mykey) => (
              <div key={mykey} id={data.id}>
                <Card style={{ width: '18rem' }}>
                  <Link to={`product/${data.id}`}>
                    {' '}
                    <Card.Img variant="top" src={data.imgZoom} style={{ width: '100%', position: 'centar' }} />
                    {' '}
                  </Link>
                  <Card.Body>
                    <Card.Title><b>{data.item}</b></Card.Title>
                    <Card.Text>
                      {data.price}
                      $
                      <br />
                      {data.category.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <FootBar />
      </div>
    );
  }
}
export default DisplayProduct;
