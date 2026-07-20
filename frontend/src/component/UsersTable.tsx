import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    role: string;
}

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("BEFORE CALLING API...........")
                const response = await api.get(
                    `/admin/users?search=${search}`
                );
                console.log("before data")
                console.log({ data: response.data })
                console.log("after data")

                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [search]);


    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
                Users
            </h2>

            <input
                type="text"
                placeholder="Search by Name, Email, Address or Role"
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
                        <th className="border p-3 text-left">Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-3">
                                <Link
                                    to={`/admin/users/${user.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {user.name}
                                </Link>
                            </td>
                            <td className="border p-3">{user.email}</td>
                            <td className="border p-3">{user.address}</td>
                            <td className="border p-3">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;