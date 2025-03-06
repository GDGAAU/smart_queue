import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './css/style.css'; 
import Logo from "../images/logo_m.png"

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setLoading(true); 

    try {
     
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        
        // Redirect to the appointment page
        navigate('/appointment');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('Network error');
      console.error('Error during login:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className="sign_up pt_100 xs_pt_70 pb_100 xs_pb_70" style={{ marginBottom: '7rem', marginTop: '10rem' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-9 col-lg-6 wow fadeInUp" data-wow-duration="1s">
            <div className="sign_up_form">
              <a href="index.html" className="sign_up_logo">
                <img src={Logo} alt="logo" className="img-fluid w-100" />
              </a>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  style={{ border: '1px solid silver' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{ border: '1px solid silver' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="common_btn w-100" disabled={loading}>
                  {loading ? 'Logging In...' : 'Login'}
                </button>

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                <p className="or">or</p>

                <p className="tf_new_account">
                  Don’t Have An Account? <Link to="/sign-up">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;


