import React, { useState } from 'react';
import './css/style.css';
import appointmentImg from '../images/appointment.jpg';

const Appointment = () => {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Send the form data to the backend API
      const response = await fetch('https://your-backend-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName,
          email,
          phone,
          symptoms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
      } else {
        setError(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setError('Network error');
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
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
                  <h2>Register</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quo itaque, officiis
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
                          required
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
                          required
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
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="appoinment_page_input">
                        <textarea
                          rows="5"
                          placeholder="Emergency level"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                        />
                        <button className="common_btn" type="submit" disabled={loading}>
                          {loading ? 'Registering...' : 'Register'}
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
