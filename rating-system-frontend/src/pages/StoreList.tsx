import React, { useEffect, useState } from "react";

type Store = {
  id: number;
  name: string;
  location: string;
};

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    setStores([
      { id: 1, name: "Star Supermarket", location: "Delhi" },
      { id: 2, name: "Cafe Coffee", location: "Pune" },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Store List</h2>
      <ul className="space-y-3">
        {stores.map((store) => (
          <li key={store.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p className="text-sm text-gray-600">{store.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
