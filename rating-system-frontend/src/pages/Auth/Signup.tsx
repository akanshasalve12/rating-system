import '../styles/globals.css';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user'
  });

  const [error, setError] = useState('');

  const validateName = (name: string) => name.length >= 20 && name.length <= 60;
  const validateAddress = (address: string) => address.length <= 400;
  const validatePasswordLength = (password: string) => password.length >= 8 && password.length <= 16;
  const validatePasswordUpper = (password: string) => /[A-Z]/.test(password);
  const validatePasswordSpecial = (password: string) => /[!@#$%^&*]/.test(password);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    validateName(formData.name) &&
    validateAddress(formData.address) &&
    validatePasswordLength(formData.password) &&
    validatePasswordUpper(formData.password) &&
    validatePasswordSpecial(formData.password) &&
    validateEmail(formData.email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Please ensure all fields meet the required criteria.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <ul className="text-sm mt-1 ml-1">
            <li className={validatePasswordLength(formData.password) ? 'text-green-600' : 'text-gray-500'}>
              • 8-16 characters
            </li>
            <li className={validatePasswordUpper(formData.password) ? 'text-green-600' : 'text-gray-500'}>
              • At least one uppercase letter
            </li>
            <li className={validatePasswordSpecial(formData.password) ? 'text-green-600' : 'text-gray-500'}>
              • At least one special character (!@#$%^&*)
            </li>
          </ul>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full p-2 text-white ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
