import React, { useState } from 'react';
import './Login.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  });

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login fn", formData);
    let responseData;
    try {
      const response = await fetch('https://placements-4.onrender.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();
      if (responseData && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('username', formData.name); // Set username in localStorage
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login. Please try again later.');
    }
  };

  const signup = async () => {
    console.log("signup fn", formData);
    let responseData;
    try {
      const response = await fetch('https://placements-4.onrender.com/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();
      if (responseData && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('username', formData.name); // Set username in localStorage
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up. Please try again later.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          <input
            name='name'
            value={formData.name}
            onChange={changehandler}
            type="text"
            placeholder='Your Name'
          />
          <input
            name='email'
            value={formData.email}
            type="email"
            onChange={changehandler}
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            type="password"
            onChange={changehandler}
            placeholder='Password'
          />
        </div>
        <button onClick={() => state === "Login" ? login() : signup()}>Continue</button>
        {state === "Sign Up" && (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => { setState("Login") }}>Login here</span>
          </p>
        )}
        {state === "Login" && (
          <p className="loginsignup-login">
            Create an account?
            <span onClick={() => { setState("Sign Up") }}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
