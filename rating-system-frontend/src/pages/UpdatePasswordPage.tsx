import React from 'react';
import { useState } from 'react';

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Password Updated:', newPassword);
    
  };

  return (
    <div className="p-4 text-xl font-semibold">
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
