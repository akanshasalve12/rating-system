import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignupPage() {
  const navigate = useNavigate();
  
  // State variables to hold input field values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);

    const newUser = { name, email, address, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        // Check if there's an error response and get the message
        const data = await response.json();
        console.error(data); // For debugging
        setError(data.message || 'Error during signup');
      } else {
        // Redirect to Login page after successful signup
        navigate('/login');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            minLength={20}
            maxLength={60}
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
        </div>
        <div>
          <label className="block">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
            maxLength={400}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            minLength={8}
            maxLength={16}
            pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,16}$"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
