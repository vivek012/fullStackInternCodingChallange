import { useState } from "react";
import api from "../services/api";

interface ChangePasswordProps {
    endpoint: string;
}

const ChangePassword = ({ endpoint }: ChangePasswordProps) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
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
            const { data } = await api.put(endpoint, formData);

            setMessage(data.message);

            setFormData({
                oldPassword: "",
                newPassword: "",
            });
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
                Change Password
            </h2>

            {message && (
                <p className="mb-4 text-green-600">
                    {message}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;