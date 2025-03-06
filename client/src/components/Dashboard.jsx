import React from 'react';
import './css/style.css'

const Dashboard = () => {
  return (
    <section className="dashboard mt_100 xs_mt_70 pb_100 xs_pb_70" style={{marginTop:'10rem'}}>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 wow fadeInLeft" data-wow-duration="1s">
            <div className="user_profile">
              <div className="user_profile_img">
                <img src="images/user_img.png" alt="user" className=" img-fluid w-100" />
                <label htmlFor="profile_photo">
                  <i className="fas fa-camera"></i>
                </label>
                <input id="profile_photo" type="file" hidden />
              </div>
              <h4>Addition Smith</h4>
              <p>Patient Id : 20220501073345</p>
            </div>
            
          </div>
          <div className="col-xl-9 col-lg-8 wow fadeInRight" data-wow-duration="1s">
            <div className="dashboard_content">
              <h5>Appointment History</h5>
              <div className="appointment_history">
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th className="sn">SN</th>
                        <th className="name">Doctor</th>
                        <th className="date">Date</th>
                        <th className="chamber">Chamber</th>
                        <th className="status">Status</th>
                        <th className="edit">Action</th>
                      </tr>
                      {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <tr key={index} className="tabile_row">
                          <td className="sn">
                            <p>{item}</p>
                          </td>
                          <td className="name">
                            <p>Dr. Samuel Bro</p>
                            <span>Dental</span>
                          </td>
                          <td className="date">
                            <p>05 Jun 2023</p>
                            <span className="date_time">4:30 PM</span>
                          </td>
                          <td className="chamber">
                            <p>12/3 Mirpur Dhaka Bangladesh</p>
                          </td>
                          <td className="status">
                            <button className={item % 2 === 0 ? "pending_btn" : ""}>
                              {item % 2 === 0 ? "Pending" : "Complete"}
                            </button>
                          </td>
                          <td className="edit">
                            <a href="#">Edit</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row mt_60" style={{marginTop:'5rem', marginBottom:'7rem'}}>
                <div className="col-12">
                  <div id="pagination">
                    <nav aria-label="...">
                      <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" href="#"><i className="far fa-angle-double-left"></i></a></li>
                        <li className="page-item"><a className="page-link active" href="#">01</a></li>
                        <li className="page-item"><a className="page-link" href="#">02</a></li>
                        <li className="page-item"><a className="page-link" href="#">03</a></li>
                        <li className="page-item"><a className="page-link" href="#"><i className="far fa-angle-double-right"></i></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
