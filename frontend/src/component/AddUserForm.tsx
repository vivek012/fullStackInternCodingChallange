import { useState } from "react";
import api from "../services/api";

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await api.post("/admin/users", formData);

            alert("User added successfully");

            setFormData({
                name: "",
                email: "",
                address: "",
                password: "",
                role: "USER",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-8">
            <h2 className="text-xl font-semibold mb-5">
                Add User
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
            >
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option value="USER">User</option>
                    <option value="OWNER">Store Owner</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;