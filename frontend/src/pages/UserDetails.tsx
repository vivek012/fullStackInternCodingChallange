import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Store {
  id: number;
  name: string;
  averageRating?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  stores?: Store[];
}

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(
          `/admin/users/${id}`
        );

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">
          User Details
        </h1>

        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Address:</strong> {user.address}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          {user.role === "OWNER" &&
            user.stores &&
            user.stores.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6">
                  Store
                </h2>

                {user.stores.map((store) => (
                  <div
                    key={store.id}
                    className="border rounded-lg p-4 mt-3"
                  >
                    <p>
                      <strong>Name:</strong> {store.name}
                    </p>

                    <p>
                      <strong>Rating:</strong>{" "}
                      {store.averageRating ?? 0}
                    </p>
                  </div>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;