import { useEffect, useState } from "react";
import api from "../services/api";
import ChangePassword from "../component/ChangePassword";


interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: number;
}

const UserDashboard = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    try {
      const { data } = await api.get(
        `/users/stores?search=${search}`
      );

      setStores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitRating = async (
    storeId: number,
    rating: number
  ) => {
    try {
      await api.post("/users/ratings", {
        storeId,
        rating,
      });

      fetchStores();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search store..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 w-full mb-6"
      />

      <div className="space-y-5">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl shadow p-6"
          >
            <h2 className="text-xl font-semibold">
              {store.name}
            </h2>

            <p>{store.address}</p>

            <p className="mt-2">
              Average Rating: {store.averageRating}
            </p>

            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    submitRating(store.id, rating)
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>


     
    </div>
  );
};

export default UserDashboard;