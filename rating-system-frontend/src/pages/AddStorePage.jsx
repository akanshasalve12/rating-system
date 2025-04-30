import React from 'react';
import { useState } from 'react';

export default function AddStorePage() {
  const [storeName, setStoreName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Store Added:', storeName);
    // Here you can handle adding the store logic
  };

  return (
    <div className="p-4 text-xl font-semibold">
      <h1>Add Store</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Store Name:</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
}
