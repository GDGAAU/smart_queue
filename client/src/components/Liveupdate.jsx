import React, { useState } from 'react';
import './css/style.css';

const Liveupdate = () => {
  const [appointments] = useState([
    { id: 1, patientName: "John Doe", department: "Dental", date: "05 Jun 2023", time: "4:30 PM", status: "Complete", isEmergency: false },
    { id: 2, patientName: "Jane Doe", department: "Cardiology", date: "06 Jun 2023", time: "2:00 PM", status: "Pending", isEmergency: true },
    { id: 3, patientName: "Michael Smith", department: "Orthopedic", date: "07 Jun 2023", time: "1:00 PM", status: "Complete", isEmergency: false },
    { id: 4, patientName: "Sarah Brown", department: "Neurology", date: "08 Jun 2023", time: "11:30 AM", status: "Pending", isEmergency: true },
    { id: 5, patientName: "Emma Wilson", department: "Pediatrics", date: "09 Jun 2023", time: "9:45 AM", status: "Complete", isEmergency: false },
  ]);

  const currentUser = { id: 2, patientName: "Jane Doe", department: "Cardiology", date: "06 Jun 2023", time: "2:00 PM", status: "Pending", isEmergency: true };

  return (
    <section className="dashboard mt_100 xs_mt_70 pb_100 xs_pb_70" style={{ marginTop: '10rem', marginLeft: '20%' }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8 wow fadeInRight" data-wow-duration="1s">
            <div className="dashboard_content">
              <h5>Appointment History</h5>
              
              {/* Current User Section */}
              <div className="current-user" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                <div>
                  <strong>{currentUser.patientName}</strong> (ID: {currentUser.id})
                </div>
                <div>
                  <button style={{  backgroundColor: '#f07878', color: 'white', padding: '7px 3rem', borderRadius: '20px', border: 'none', marginRight: '10px' }}>Cancel</button>
                  <button style={{ backgroundColor: '#2AC28E', color: 'white', padding: '7px 3rem', borderRadius: '20px', border: 'none' }}>Reschedule</button>
                </div>
              </div>

              <div className="appointment_history">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="sn">ID</th>
                        <th className="name">Queue</th>
                        <th className="date">Date</th>
                        <th className="status">Status</th>
                        <th className="edit">Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="tabile_row" style={appointment.id === currentUser.id ? { backgroundColor: '#DBFAFE', color: 'white' } : {}}>
                          <td className="sn">
                            <p>{appointment.id}</p>
                          </td>
                          <td className="name">
                            <p>Patient {appointment.id}</p>
                            <span>{appointment.department}</span>
                          </td>
                          <td className="date">
                            <p>{appointment.date}</p>
                            <span className="date_time">{appointment.time}</span>
                          </td>
                          <td className="status">
                            <button className={appointment.status === 'Pending' ? 'pending_btn' : ''}>
                              {appointment.status}
                            </button>
                          </td>
                          <td className="edit">
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

export default Liveupdate;







