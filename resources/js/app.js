/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');

/** ************************************ */
import React from 'react';
import { render } from 'react-dom'; // if you use just render()
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; // connects global store to entire app
import Homepage from './components/Homepage';
import DisplayProduct from './components/DisplayProduct';
import DisplayCategory from './components/DisplayCategory';
import OneProduct from './components/OneProduct';
import CheckOut from './components/CheckOut';
import OrderPlaced from './components/OrderPlaced';
import allReducers from './reducers';

require('./bootstrap');

const myStore = createStore(allReducers,
// eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// myStore.dispatch({type:'INCREMENT'});
// myStore.dispatch(increment());
// myStore.dispatch(increment());
// myStore.dispatch(increment());
// myStore.dispatch(decrement());
ReactDOM.render(
  <Provider store={myStore}>
    <Router history={hashHistory}>

      {/* <Route path="/master" component={Master} > */}
      <Route path="/" component={Homepage} />
      <Route path="/display-item" component={DisplayProduct} />
      <Route path="/category/:id" component={DisplayCategory} />
      <Route path="/product/:id" component={OneProduct} />
      <Route path="/checkout" component={CheckOut} />
      <Route path="/orderPlaced" component={OrderPlaced} />
      {/* </Route> */}
    </Router>
  </Provider>,
  document.getElementById('crud-app'),
);
