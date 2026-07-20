import { useEffect, useState } from "react";
import api from "../services/api";

interface Store {
    id: number;
    name: string;
    email: string;
    address: string;
    averageRating: number;
}

const StoresTable = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const { data } = await api.get(
                    `/admin/stores?search=${search}`
                );

                setStores(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStores();
    }, [search]);

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
                Stores
            </h2>


            <input
                type="text"
                placeholder="Search by Name, Email or Address"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mb-4"
            />

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-left">Name</th>
                        <th className="border p-3 text-left">Email</th>
                        <th className="border p-3 text-left">Address</th>
                        <th className="border p-3 text-left">Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td className="border p-3">{store.name}</td>
                            <td className="border p-3">{store.email}</td>
                            <td className="border p-3">{store.address}</td>
                            <td className="border p-3">
                                {store.averageRating ?? 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoresTable;