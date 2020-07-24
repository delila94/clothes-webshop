/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';
import NavBar from './NavBar';
import FootBar from './FootBar';

class DisplayCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: [] };
  }

  componentDidMount() {
    axios.post('showCat', { id: this.props.params.id })
      .then((response) => {
        this.setState({ category: response.data });
      });
  }

  componentDidUpdate() {
    axios.post('showCat', { id: this.props.params.id })
      .then((response) => {
        this.setState({ category: response.data });
      });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    // eslint-disable-next-line no-unused-vars
    this.setState = (state, callback) => {

    };
  }

  //  {this.state.isMouseInside ?
  // <Link to={"product/"+data.id} className="btn btn-primary">View</Link>  : null}
  render() {
    return (
      <div>
        <NavBar />
        <div className="container" style={{ marginTop: '30px' }}>
          <h5>Products</h5>
          <br />

          <div className="row justify-content-center">
            {this.state.category.map((data, mykey) => (
              <div
                key={mykey}
                id={data.id}
              >
                <Card style={{ width: '18rem' }}>
                  <Link to={`product/${data.id}`}><Card.Img variant="top" src={data.imgZoom} /></Link>
                  <Card.Body>
                    <Card.Title><b>{data.item}</b></Card.Title>
                    <Card.Text>
                      {data.price}
                      $

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
export default DisplayCategory;
