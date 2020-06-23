/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');

/***************************************/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './components/Homepage';
import DisplayProduct from './components/DisplayProduct';
import DisplayCategory from './components/DisplayCategory';
import OneProduct from  './components/OneProduct';

render(
  <Router history={hashHistory}>
    
    {/* <Route path="/master" component={Master} >*/}
        <Route path="/" component={Homepage} />
        <Route path="/display-item" component={DisplayProduct} />
        <Route path="/category/:id" component={DisplayCategory}/>
        <Route path="/product/:id" component={OneProduct} />
      {/*</Route>*/}
    </Router>,
        document.getElementById('crud-app'));