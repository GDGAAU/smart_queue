import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './css/style.css'; 
import Logo from "../images/logo_m.png";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Make a POST request to the backend with the registration data
      const response = await fetch('https://your-backend-api.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration (e.g., redirect to login)
        console.log('Registration successful:', data);
        // Redirect to login or handle success as needed
      } else {
        // Handle error
        setError(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setError('Network error');
      console.error('Error during registration:', error);
    } finally {
      setLoading(false); // Stop loading state
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
                  placeholder="Name"
                  style={{ border: '1px solid silver' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  style={{ border: '1px solid silver' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="phone"
                  placeholder="Phone"
                  style={{ border: '1px solid silver' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{ border: '1px solid silver' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{ border: '1px solid silver' }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="common_btn w-100" disabled={loading}>
                  {loading ? 'Registering...' : 'Register Now'}
                </button>

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                <p className="or">or</p>

                <p className="tf_new_account">
                  Have An Account? <Link to="/sign-in">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

