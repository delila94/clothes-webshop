import React, {Component} from 'react';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';
import styles from './styleDelila.css';
class FootBar extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', products: [],category:[],isMouseInside:false};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
      }
    handleMouseEnter () {
        this.setState({ isMouseInside: true });
       // console.log("enter",this.state.isMouseInside);
      }
      handleMouseLeave () {
        this.setState({ isMouseInside: false });
      }
    

    render () {
        return (
            <div className="d-flex flex-column" style={{marginTop:"30px"}} >
  <footer className="py-2 bg-dark text-white-50"  sticky="top" fixed="bottom" style={{color:"white"}}>
            <div className="container">
  <div className="row">
  <div className="col-sm-12 col-md-6">
            <h4 style={{color:"white", marginBottom:"15px"}}>About</h4>
            <p className="text-justify">Welcome to DH Online Store, your number
             one source for all things of our clothes. We're dedicated to providing you
              the best of quality materials clothes, with a focus on dependability
              We're working to turn our passion for clothes 
              into a booming online store. We hope you enjoy our products 
              as much as we enjoy offering them to you.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <h4 style={{color:"white", marginBottom:"15px"}}>Categories</h4>
            <ul style={{listStyle:"none"}} className="footer-links" >
              <li><a id="linkid" href="#/category/1">Pants</a></li>
              <li><a id="linkid"  href="#/category/2">Shirts</a></li>
              <li><a id="linkid" href="#/category/3">Dress</a></li>
               <li><a id="linkid" href="#">Shoes</a></li>
              <li><a id="linkid" href="#">Jackets</a></li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-3">
            <h4 style={{color:"white", marginBottom:"15px"}}>Quick Links</h4>
            <ul className="footer-links" style={{listStyle:"none"}}>
              <li><a id="linkid" href="#">About Us</a></li>
              <li><a id="linkid" href="#">Contact Us</a></li>
              <li><a id="linkid" href="#">Contribute</a></li>
              <li><a id="linkid" href="#">Privacy Policy</a></li>
              <li><a id="linkid" href="#">Sitemap</a></li>
            </ul>
          </div>
  </div>
  <hr style={{ border: "0",height: "0",borderTop: "1px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by Delila Halac.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="container">
  <div className="row">
  <div className="col-sm">
  <a id="social-icons" className="facebook " href="#"><i className="fa fa-facebook"></i></a>
  </div>
    <div className="col-sm">
    <a   className={styles.socialicons} href="#"><i className="fa fa-twitter"></i></a>
    </div>
    <div className="col-sm">
    <a id="social-iconsDribble" className="dribbble" href="#"><i className="fa fa-dribbble"></i></a>
    </div>
    <div className="col-sm">
    <a id="social-iconsL" className="linkedin" href="#"><i className="fa fa-linkedin"></i></a>
    </div>
  </div>
</div>
          </div>
        </div>
        </div>      
</footer>
</div>

        );
    }

}
export default FootBar;