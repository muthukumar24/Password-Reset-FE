import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
       await axios.post('https://password-reset-usd2.onrender.com/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        navigate('/home', { state: response.data.username });
    }).catch(error => {
      console.log("Error", error);
    });
    } catch (error) {
      // Debugging line to check error
      console.error('Error during login:', error.response ? error.response.data : error.message); 
      alert('Invalid credentials');
    }
  };


  return (
    <div className="container mt-5 px-2 py-4">
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
          <div className='container mt-5 py-4 login-form'>
            <div className='row d-flex justify-content-center align-items-center'>
              <div className='col-sm-12 col-md-10 col-lg-8 col-xl-8'>
                <h1 className='text-center'><i className="bi bi-person-circle"></i></h1>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link p-0 mt-2"
                      onClick={() => navigate('/forgot-password')}
                      style={{ textDecoration: 'none' }}
                    >
                      Forgot Password
                    </button>
                  </div>
                  <div className='d-flex justify-content-center gap-4'>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate('/signup')}
                    >
                      SignUp
                    </button>
                  </div>
                </form>
                <p className='text-center mt-3'>Or</p>
                <p className='text-center'>Login With</p>
                <div className='d-flex justify-content-center gap-2'>
                  <button className='btn btn-outline-danger'><i className="bi bi-google"></i></button>
                  <button className='btn btn-outline-danger'><i className="bi bi-linkedin"></i></button>
                  <button className='btn btn-outline-danger'><i className="bi bi-github"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

