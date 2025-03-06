import React from 'react';
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterestP, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Logo from '../images/logo_m.png'


const Footer = () => {
  return (
    <footer className="mt_60 " style={{   background: '#DBFAFE'}}>
      <div className="container">

        <div className="row mt_50" style={{paddingTop:'7rem',}}>
          <div className="col-lg-3 col-sm-9 col-md-6">
            <div className="footer_left">
              <a href="index.html" className="tf_footer_logo">
                <img
                  src={Logo}
                  alt="MediFax"
                  className="img-fluid w-100"
                />
              </a>
              <p>
                There are to popular belie Lorem is Ipsum is not simply
                random.
              </p>
             
              <div className="tf_footer_icon d-flex flex-wrap align-items-center">
               
                <ul className="d-flex flex-wrap">
                <li>
                    <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </li>
                <li>
                    <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </li>
                <li>
                    <a href="#">
                    <FontAwesomeIcon icon={faPinterestP} />
                    </a>
                </li>
                <li>
                    <a href="#">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 col-md-4">
            <div className="quick_link">
              <h5>Company</h5>
              <ul>
                <li>
                  <a href="index.html">home</a>
                </li>
                <li>
                  <a href="about.html">about us</a>
                </li>
                <li>
                  <a href="service.html">our service</a>
                </li>
                <li>
                  <a href="team.html">our team</a>
                </li>
                <li>
                  <a href="contact.html">contact us</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 col-md-3">
            <div className="quick_link">
              <h5>Important</h5>
              <ul>
                <li>
                  <a href="#">Appointment</a>
                </li>
                <li>
                  <a href="faq.html">faq</a>
                </li>
                <li>
                  <a href="privacy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="terms_condition.html">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 col-md-3">
            <div className="quick_link">
              <h5>Quick Link</h5>
              <ul>

                <li>
                  <a href="priceing.html">Pricing Plan</a>
                </li>

                <li>
                  <a href="sing_up.html">login</a>
                </li>

              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 order-md-2">
            <div className="address">
              <h5>Official Info</h5>
              <div className="tf_footer_address">
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  2767 Sunrise Street, NY 1002, USA
                </p>
                <a href="#">
                  <i className="fas fa-envelope"></i>
                  company@gmail.com
                </a>
                <a href="#">
                  <i className="fas fa-phone-alt"></i>
                  +965548547564
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt_70 xs_mt_45 sm_margin">
          <div className="col-xl-12">
            <div className="copyright d-flex flex-wrap justify-content-between">
              <p>2023 Ethio Medical Clinic. All rights reserved.</p>
              <ul className="d-flex flex-wrap">
                <li>
                  <a href="terms_condition.html">Terms and conditions</a>
                </li>
                <li>
                  <a href="privacy.html">Privacy policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
