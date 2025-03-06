import "./css/style.css";
import { Link } from "react-router-dom";
import homeImg from "../images/home.jpg"

const HomeTwoBanner = () => {

  return (
    <section className="home_two_banner" style={{ 
      backgroundImage: `url(${homeImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center", }}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 col-xl-5 wow fadeInLeft" data-wow-duration="1s">
            <div className="banner_text">
              <h1>Protect Your Health And Take Care <span>Your Health</span></h1>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.</p>
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
  );
};

export default HomeTwoBanner;







