import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5500");

const Liveupdate = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedInUserId =  // Example user ID (Replace with dynamic ID from auth)

  useEffect(() => {
    fetchAppointments();
    socket.on("updateAppointments", fetchAppointments);
    
    return () => {
      socket.off("updateAppointments");
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post("http://localhost:5000/update-appointment", { id, status });
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const currentUser = appointments.find(app => app.id === loggedInUserId);

  return (
    <section className="dashboard mt_100 xs_mt_70 pb_100 xs_pb_70" style={{ marginTop: '10rem', marginLeft: '20%' }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="dashboard_content">
              <h5>Appointment History</h5>

              {/* Current User Section */}
              {currentUser && (
                <div className="current-user" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                  <div>
                    <strong>{currentUser.patientName}</strong> (ID: {currentUser.id})
                  </div>
                  <div>
                    <button
                      style={{ backgroundColor: '#f07878', color: 'white', padding: '7px 3rem', borderRadius: '20px', border: 'none', marginRight: '10px' }}
                      onClick={() => updateStatus(currentUser.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ backgroundColor: '#2AC28E', color: 'white', padding: '7px 3rem', borderRadius: '20px', border: 'none' }}
                      onClick={() => updateStatus(currentUser.id, "Rescheduled")}
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              )}

              <div className="appointment_history">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Queue</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="tabile_row" style={appointment.id === loggedInUserId ? { backgroundColor: '#DBFAFE', color: 'white' } : {}}>
                          <td>{appointment.id}</td>
                          <td>
                            <p>Patient {appointment.id}</p>
                            <span>{appointment.department}</span>
                          </td>
                          <td>
                            <p>{appointment.date}</p>
                            <span className="date_time">{appointment.time}</span>
                          </td>
                          <td>
                            <button className={appointment.status === 'Pending' ? 'pending_btn' : ''}>
                              {appointment.status}
                            </button>
                          </td>
                          <td>
                            {appointment.isEmergency ? (
                              <a href="#" style={{ textDecoration: 'none', backgroundColor: '#f07878', color: 'white', padding: '7px 5rem', borderRadius: '20px' }}>
                                Emergency
                              </a>
                            ) : (
                              <a href="#" style={{ textDecoration: 'none', backgroundColor: '#2AC28E', color: 'white', padding: '7px 5rem', borderRadius: '20px' }}>
                                Regular
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row mt_60" style={{ marginTop: '5rem', marginBottom: '7rem' }}>
                <div className="col-12">
                  <div id="pagination">
                    <nav>
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

export default Liveupdate;
