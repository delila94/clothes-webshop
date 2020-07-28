/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import NavBar from './NavBar';
import FootBar from './FootBar';

class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.state = { bag: [] };
  }

  componentDidMount() {
    axios.get('cart')
      .then((res) => {
        this.setState({
          bag: Object.values(res.data.content),
        });
      });
    axios.get('clear');
    // eslint-disable-next-line space-in-parens
    // eslint-disable-next-line arrow-parens
    // since I want after someone refresh the page to see order all the time I must
    // prevent reloading cart again since after order is completed cart is empty

    /* let critical = JSON.parse(localStorage.getItem('help'));
    this.setState({
      help: critical,
    }, () => {
      if (this.state.help === false) {
        axios.get('cart')
          .then((res) => {
            localStorage.setItem('help', JSON.stringify(true)); // not to enter again to fetch data
            localStorage.setItem('myCart', JSON.stringify(Object.values(res.data.content))); // store bag in local storage
            const critical1 = JSON.parse(localStorage.getItem('myCart')); // display cart
            this.setState({
              bag: critical1,
            });
            critical = JSON.parse(localStorage.getItem('help'));
            this.setState({
              help: critical,
            }, () => { axios.get('clear'); });
          });
      }
    });
    const critical1 = JSON.parse(localStorage.getItem('myCart')); // display cart
    this.setState({
      bag: critical1,
    }); */
  }

  getBag() {
    axios.get('cart')
      .then((res) => {
        this.props.dispatch({
          type: 'GET_CONTENT',
          payload: Object.values(res.data.content),
        });
      });
  }

  increment() {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement() {
    this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <hr style={{
            border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          }}
          />
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'green' }}>
            <i className="fa fa-check-circle" aria-hidden="true" style={{ color: 'green' }} />
            Your order has been placed.
          </h1>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Thank you for shopping with us!</h3>
          <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>You will get confirmation email shortly.</h5>
          {/* Counter:
          {' '}
          <button type="button" onClick={this.decrement.bind(this)}>-</button>
          {this.props.counter}
          <button type="button" onClick={this.increment.bind(this)}>+</button>
          {' '}
          <br />
          {' '}
          {this.props.isLogged ? <h4>You are logged in</h4> : 'you are not logged in'}
         */}
          <div className="shadow p-3 mb-5 rounded" style={{ padding: '75px', backgroundColor: '#F1F1F1', textAlign: 'center' }}>
            <div className="row">
              <div className="col-lg 4 col-md-4 col-sm-12 col-xs-12">
                <b>
                  Name:
                  {' '}
                </b>
              </div>
              <div className="col-lg 4 col-md-4 col-sm-12 col-xs-12">
                <b>
                  Quantity:
                  {' '}
                </b>
              </div>
              <div className="col-lg 4 col-md-4 col-sm-12 col-xs-12">
                <b>
                  Price $ :
                </b>
              </div>
            </div>
            {this.state.bag.map((data, mykey) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="row" key={mykey}>
                <div className="col-4 p-3">

                  {data.name}

                </div>
                <div className="col-4 p-3">

                  {data.quantity}

                </div>
                <div className="col-4 p-3">
                  $
                  {data.quantity * data.price}
                </div>
              </div>

            ))}
          </div>
          <hr style={{
            border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          }}
          />
          <small className="form-text text-muted">All orders are subject to approval of our Verification department. We will notify you by phone or email should your order be delayed.</small>

        </div>
        <FootBar />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  counter: state.counter,
  shoppingBag: state.shoppingBag,
});
// function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ selectBag: getShoppingBag }, dispatch);

export default connect(mapStateToProps)(OrderPlaced); // hoc fucntion
