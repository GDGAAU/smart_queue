import "./css/style.css";
import { Link } from "react-router-dom";
import homeImg from "../images/home.jpg"
import home1 from "../images/home1.jpg"
import home2 from "../images/home2.jpg"

const HomeTwoBanner = () => {

  return (
    <>
    <section className="home_two_banner" style={{ 
      backgroundImage: `url(${homeImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center", }}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 col-xl-5 wow fadeInLeft" data-wow-duration="1s">
              <div className="banner_text">
              <h1>Book Your Appointment,Manage <span>Your Health</span></h1>
              <p style={{color:'black', fontWeight:'500'}}>Our system simplifies your hospital visits, allowing you to book appointments with ease and ensure timely care.</p>
            </div>

            <div style={{marginTop:'-2rem'}}>
            <Link to="/appointment" className="common_btn" style={{ marginRight: '15px', textDecoration: 'none' }}>
              Get Appointment
            </Link>
            <Link to="/emergency" className="common_btn" style={{ textDecoration: 'none' }}>
              Register Emergency
            </Link>
            </div>
          </div>
         
        </div>
      </div>
    </section>

    <section className="about_page" style={{marginTop:'10rem', marginBottom:'10rem'}}>
      <div className="about pt_100 xs_pt_70 pb_100 xs_pb_70">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-9 col-lg-5 col-md-7 wow fadeInLeft" data-wow-duration="1s">
              <div className="about_img">
                <div className="about_img_1">
                  <img src={home1} alt="about img" className="img-fluid w-100" />
                </div>
                <div className="about_img_2">
                  <img src={home2} alt="about img" className="img-fluid w-100" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-12 col-lg-7 wow fadeInRight" data-wow-duration="1s">
              <div className="common_heading">
                <h2>Comprehensive Healthcare for a Healthier Tomorrow</h2>
                <p>At our hospital, we believe in providing the highest quality care that is compassionate, personalized, and centered around you. With years of experience in the healthcare industry, our team of dedicated professionals, including expert doctors, nurses, and staff, work tirelessly to ensure that every patient receives the best treatment. Our hospital combines cutting-edge technology with traditional healthcare practices to create an environment where every patient’s health and well-being are our top priority.</p>
                <p>
                  We offer a wide range of services including emergency care, surgeries, specialized treatments, and preventative healthcare. Our mission is to provide exceptional, patient-focused care with a focus on safety, comfort, and effective healing. Whether you're here for routine care or a specialized treatment, we are committed to ensuring that you receive the best possible outcomes for your health. Join us on your journey to better health, where our expertise and dedication to patient care help you live a healthier and more fulfilling life.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HomeTwoBanner;







