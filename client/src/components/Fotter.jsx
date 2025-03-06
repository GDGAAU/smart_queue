import React from 'react';
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
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
              Providing Care with Compassion and Excellence for a Healthier Tomorrow.
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
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="/appointment">book appointment</a>
                </li>
                <li>
                  <a href="/liveupdate">view status</a>
                </li>
                <li>
                  <a href="/emerhency">register emergency</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 col-md-3">
            <div className="quick_link">
              <h5>Important</h5>
              <ul>
              
                <li>
                  <a href="#">faq</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 col-md-3">
            <div className="quick_link">
              <h5>Quick Link</h5>
              <ul>

                <li>
                  <a href="#">Pricing Plan</a>
                </li>

                <li>
                  <a href="/sing_in">login</a>
                </li>

              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 order-md-2">
            <div className="address">
              <h5>Official Info</h5>
              <div className="tf_footer_address">
              <div className="contact-info" style={{ fontFamily: 'Arial, sans-serif' }}>
                <p style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaMapMarkerAlt style={{ marginRight: '10px' }} /> 123 Addis Ababa, Ethiopia
                </p>
                <a href="mailto:company@example.com" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaEnvelope style={{ marginRight: '10px' }} /> company@example.com
                </a>
                <a href="tel:+251912345678" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaPhoneAlt style={{ marginRight: '10px' }} /> +251 91 234 5678
                </a>
              </div>
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
