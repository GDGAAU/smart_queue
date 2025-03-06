import React, { useState } from 'react';
import './css/style.css';
import appointmentImg from '../images/appointment.jpg';

const Appointment = () => {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [symptoms, setSymptoms] = useState(''); 
  const [registerStandUp, setRegisterStandUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      // Send the form data to the backend API
      const response = await fetch('https://your-backend-api.com/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName,
          email,
          phone,
          department,
          doctor,
          appointmentDate,
          appointmentTime,
          symptoms,
          registerStandUp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful appointment booking
        console.log('Appointment booked successfully:', data);
        // Reset form fields or redirect as necessary
      } else {
        // Handle backend error
        setError(data.message || 'An error occurred during appointment booking');
      }
    } catch (error) {
      setError('Network error');
      console.error('Error during appointment booking:', error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="appointment_page pt_100 xs_pt_65 pb_100 xs_pb_70" style={{ marginBottom: '7rem', marginTop: '10rem' }}>
      <div className="container">
        <div className="appointment_content">
          <div className="row">
            <div className="col-xl-5 col-lg-6 wow fadeInLeft" data-wow-duration="1s">
              <div className="appointment_page_img">
                <img src={appointmentImg} alt="appointment" className="img-fluid w-100" />
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 wow fadeInRight" data-wow-duration="1s">
              <div className="appointment_page_text">
                <form onSubmit={handleSubmit}>
                  <h2>Book Appointment</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quo itaque, officiis
                    voluptatem provident inventore nobis voluptas impedit eligendi, officia asperiores
                    ad autem ratione quam.
                  </p>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="appoinment_page_input">
                        <input
                          type="text"
                          placeholder="Patient Name*"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input">
                        <input
                          type="email"
                          placeholder="Email*"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input">
                        <input
                          type="text"
                          placeholder="Phone*"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input dropdown_input" style={{padding:'12px 15px', background:'#DBFAFE', borderRadius:'40px'}}>
                        <select
                          className="select_2"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        >
                          <option value="">Select Department</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Ophthalmology">Ophthalmology</option>
                          <option value="Pediatric">Pediatric</option>
                          <option value="Radiology">Radiology</option>
                          <option value="Urology">Urology</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input dropdown_input" style={{padding:'12px 15px', background:'#DBFAFE', borderRadius:'40px'}}>
                        <select
                          className="select_2"
                          value={doctor}
                          onChange={(e) => setDoctor(e.target.value)}
                        >
                          <option value="">Select Doctor</option>
                          <option value="Dr. Hasan Mahamud">Dr. Hasan Mahamud</option>
                          <option value="Dr. Moinuddin">Dr. Moinuddin</option>
                          <option value="Dr. Afroja Akter">Dr. Afroja Akter</option>
                          <option value="Dr. Mamunur Rasid">Dr. Mamunur Rasid</option>
                          <option value="Dr. Abdus Salam">Dr. Abdus Salam</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input">
                        <input
                          type="date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="appoinment_page_input dropdown_input" style={{padding:'12px 15px', background:'#DBFAFE', borderRadius:'40px'}}>
                        <select
                          className="reservation_input select_2"
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                        >
                          <option value="">Select Time</option>
                          <option value="10:00 am to 11:00 am">10:00 am to 11:00 am</option>
                          <option value="11:00 am to 12:00 pm">11:00 am to 12:00 pm</option>
                          <option value="3:00 pm to 4:00 pm">3:00 pm to 4:00 pm</option>
                          <option value="4:00 pm to 5:00 pm">4:00 pm to 5:00 pm</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      
                      <div className="appoinment_page_input" style={{ alignItems: 'start', width: '100%', marginTop:'15px',padding:'12px 15px', background:'#DBFAFE', borderRadius:'40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'start',marginBottom: '0'}}>
                        <div className='standby' style={{width:"100px", display:"flex"}}><label style={{ marginRight: '10px', marginBottom: '0'  }}>Standby</label>
                      <input type="checkbox" checked={isChecked} onChange={handleChange} style={{ marginLeft: '0', width:"20px" }} /></div>
                      </div>
                      <p style={{fontSize:"14px", color:"gray"}}>Enable standby to be prioritized if an earlier slot opens due to cancellations or no-shows.</p>
                      </div>
                    </div>
                    
                   
                    <div className="col-lg-12">
                      <div className="appoinment_page_input">
                       
                        <textarea
                          rows="5"
                          placeholder="Symptoms"
                          value={symptoms} // Changed to symptoms
                          onChange={(e) => setSymptoms(e.target.value)} // Updated state setter
                        />
                       
                        <button className="common_btn" type="submit" disabled={loading}>
                          {loading ? 'Booking Appointment...' : 'Book Appointment'}
                        </button>
                       
                      </div>
                    </div>
                  </div>
                </form>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;


