
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid gap-4">
        <Link
          to="/add-store"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Store
        </Link>

        <Link
          to="/stores"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View All Stores
        </Link>

        <Link
          to="/ratings"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View All Ratings
        </Link>
      </div>
    </div>
  );
}
