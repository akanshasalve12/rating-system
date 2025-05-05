import React, { useState } from 'react';

export default function AddStorePage() {
  const [storeName, setStoreName] = useState<string>(''); // add type for state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // type for event
    e.preventDefault();
    console.log('Store Added:', storeName);
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
