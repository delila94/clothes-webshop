/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import FootBar from './FootBar';

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      subtotal: 0, mailError: '', shipping: 25, total: 0, message: '', efname: '', elname: '', eaddress: '', ecity: '', ecountry: '', ezip: '', ephone_number: '', email: '', fname: '', lname: '', address: '', city: '', country: '', zip: '', phone_number: '', mail: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDev = this.handleChangeDev.bind(this);
    localStorage.setItem('help', JSON.stringify(false));
    localStorage.removeItem('myCart');
  }

  componentDidMount() { // show total and subtotal due
    axios.get('subtotal')
      .then((response) => {
        this.setState({ subtotal: response.data });
      });
    axios.post('shipping', { shipping: this.state.shipping });
    axios.get('total').then((response) => { this.setState({ total: response.data }); });
  }

  onChange(e) { // pick a value for address fields
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(e) { // choose country
    e.preventDefault();
    this.setState({ country: e.target.value });
  }

  handleChangeDev(e) { // choose shipping
    e.preventDefault();
    this.setState({ shipping: e.target.value }, () => {
      axios.post('shipping', { shipping: this.state.shipping });
      axios.get('total').then((response) => { this.setState({ total: response.data }); });
    });
  }

  handleOrder(e) { // store customer and order
    e.preventDefault();
    axios.post('storeCustomer', {
      shipping: this.state.shipping,
      fname: this.state.fname,
      lname: this.state.lname,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      zip: this.state.zip,
      mail: this.state.mail,
      phone_number: this.state.phone_number,
    })
    // eslint-disable-next-line no-unused-vars
      .then((response) => {
        // eslint-disable-next-line no-unused-vars
        axios.post('sendbasicemail', { fname: this.state.fname, mail: this.state.mail }).then((res) => {
          this.setState({
            message: 'Your order is placed. Thank you for shopping with us!', efname: '', elname: '', eaddress: '', ecity: '', ecountry: '', ezip: '', ephone_number: '', email: '',
          });
          hashHistory.push('/orderPlaced');
        });
      })
      .catch((error) => { // error.response.data what php returns as invalid fields
        this.setState({
          message: error.response.data.message,
          efname: error.response.data.errors.fname,
          elname: error.response.data.errors.lname,
          eaddress: error.response.data.errors.address,
          ecity: error.response.data.errors.city,
          ecountry: error.response.data.errors.country,
          ezip: error.response.data.errors.zip,
          ephone_number: error.response.data.errors.phone_number,
          email: error.response.data.errors.mail,
        });
      });
  }

  render() {
    const {
      fname, lname, address, city, zip, mail, phone_number,
    } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <NavBar />
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a style={{ color: '#2C0F4D' }} className="nav-item nav-link active" id="nav-address-tab" data-toggle="tab" href="#nav-address" role="tab" aria-controls="nav-home" aria-selected="true">Address</a>
            <a style={{ color: '#2C0F4D' }} className="nav-item nav-link" id="nav-delivery-tab" data-toggle="tab" href="#nav-delivery" role="tab" aria-controls="nav-profile" aria-selected="false">Delivery & Payment</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-address" role="tabpanel" aria-labelledby="nav-address-tab">
            <div className="container">
              <div style={{ marginTop: '13px' }}>
                <h5>Billing Address</h5>
                {' '}
              </div>
              <hr style={{
                border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              />

              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="validationServer01">First Name</label>
                    <input className="form-control" id="validationServer01" placeholder="First Name" value={fname} onChange={(e) => this.setState({ fname: e.target.value })} required />
                    <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.efname}</small>

                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputLname">Last Name</label>
                    <input className="form-control" id="inputLname" placeholder="Last Name" value={lname} onChange={(e) => this.setState({ lname: e.target.value })} />
                    <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.elname}</small>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Address</label>
                  <input className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e) => this.setState({ address: e.target.value })} />
                  <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.eaddress}</small>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input className="form-control" id="inputCity" value={city} onChange={(e) => this.setState({ city: e.target.value })} />
                    <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.ecity}</small>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select id="inputState" className="form-control" onChange={(e) => { this.handleChange(e); }}>
                      <option selected>Choose...</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Åland Islands</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia, Plurinational State of</option>
                      <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="BN">Brunei Darussalam</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo, the Democratic Republic of the</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Côte d'Ivoire</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Curaçao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands (Malvinas)</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">Heard Island and McDonald Islands</option>
                      <option value="VA">Holy See (Vatican City State)</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran, Islamic Republic of</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">Korea, Democratic People's Republic of</option>
                      <option value="KR">Korea, Republic of</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Lao People's Democratic Republic</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao</option>
                      <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia, Federated States of</option>
                      <option value="MD">Moldova, Republic of</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PS">Palestinian Territory, Occupied</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="RE">Réunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russian Federation</option>
                      <option value="RW">Rwanda</option>
                      <option value="BL">Saint Barthélemy</option>
                      <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="MF">Saint Martin (French part)</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">Saint Vincent and the Grenadines</option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome and Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SX">Sint Maarten (Dutch part)</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syrian Arab Republic</option>
                      <option value="TW">Taiwan, Province of China</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania, United Republic of</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UM">United States Minor Outlying Islands</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela, Bolivarian Republic of</option>
                      <option value="VN">Viet Nam</option>
                      <option value="VG">Virgin Islands, British</option>
                      <option value="VI">Virgin Islands, U.S.</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                    <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.ecountry}</small>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input className="form-control" id="inputZip" value={zip} onChange={(e) => this.setState({ zip: e.target.value })} />
                    <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.ezip}</small>
                  </div>
                </div>
              </form>
              <hr style={{
                border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              />
              <h5>Contact Information</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input typle="email" className="form-control" value={mail} onChange={(e) => this.setState({ mail: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.email}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPhone">Phone Number</label>
                  <input value={phone_number} onChange={(e) => this.setState({ phone_number: e.target.value })} className="form-control" id="exampleInputPhone" placeholder="Phone Number" />
                  <small style={{ color: 'red', fontWeight: 'bold' }}>{this.state.ephone_number}</small>
                </div>

              </form>

            </div>
          </div>
          <div className="tab-pane fade" id="nav-delivery" role="tabpanel" aria-labelledby="nav-delivery-tab">
            <div className="container">
              <div className="row">
                <div className="col-7" style={{ paddingTop: '50px' }}>
                  <label>
                    Choose Shipping method:
                    <select
                      id="inputState"
                      className="form-control"
                      style={{ width: '300px' }}
                      defaultValue={this.state.shipping}
                      onChange={(e) => { this.handleChangeDev(e); }}
                    >
                      <option selected value="25">Fast Shipping $25</option>
                      <option value="10">Standard Shipping $10</option>
                    </select>
                  </label>
                  <hr style={{
                    border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                  />
                  Form for Payment
                  <br />
                  <br />
                  <button type="button" style={{ backgroundColor: '#2C0F4D' }} onClick={(evt) => this.handleOrder(evt)} className="btn btn-primary">Complete order</button>
                  <small className="form-text text-muted"> You will be charged</small>
                  <h5>{this.state.message}</h5>
                </div>
                <div style={{ backgroundColor: '#EEEEEE', padding: '54px', marginTop: '20px' }} className="col-5 shadow p-3 mb-5 rounded">
                  <p>Payment Due:</p>
                  <hr style={{
                    border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                  />

                  <b>Order Summary</b>
                  <div className="row">
                    <div className="col-8">
                      <b>Merchandise Subtotal: </b>
                    </div>
                    <div className="col-4">
                      $
                      {this.state.subtotal}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      Shipping & Handling:
                    </div>
                    <div className="col-4">
                      $
                      {this.state.shipping}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <p style={{ color: '#2C0F4D', fonWeight: '1200' }}>Order Total: </p>
                    </div>
                    <div className="col-4">
                      <p style={{ color: '#2C0F4D', fonWeight: '1200' }}>
                        {' '}
                        $
                        {this.state.total}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <h4>  Payment Due: </h4>
                    </div>
                    <div className="col-4">
                      <h4 style={{ color: '#2C0F4D', fonWeight: '1200' }}>
                        $
                        {this.state.total}
                      </h4>
                    </div>
                  </div>
                  <hr style={{
                    border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                  />
                  <p>
                    {' '}
                    <small className="text-muted">
                      <span>Customs and Import Duties Information</span>
                      <br />
                      By placing your order, you acknowledge: your order may be subject
                      to import duties and taxes, which are levied once your package reaches your
                      country; DH Online Store does not collect duties and taxes and cannot
                      predict what your particular charges may be; and in the event you incur
                      these additional charges, they must be rendered in order for your package to
                      clear customs. For more information regarding your country's custom policies,
                      please contact your local customs office.
                      {' '}
                    </small>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        <FootBar />

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  shoppingBag: state.shoppingBag,
});
export default connect(mapStateToProps)(CheckOut);
