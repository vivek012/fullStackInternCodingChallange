import { useEffect, useState } from "react";
import api from "../services/api";

interface Owner {
    id: number;
    name: string;
}

const AddStoreForm = () => {
    const [owners, setOwners] = useState<Owner[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        ownerId: "",
    });

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const { data } = await api.get("/admin/owners");
                setOwners(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOwners();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
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
            await api.post("/admin/stores", {
                ...formData,
                ownerId: Number(formData.ownerId),
            });

            alert("Store added successfully");

            setFormData({
                name: "",
                email: "",
                address: "",
                ownerId: "",
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-5">
                Add Store
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
            >
                <input
                    name="name"
                    placeholder="Store Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="email"
                    placeholder="Store Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    name="address"
                    placeholder="Store Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <select
                    name="ownerId"
                    value={formData.ownerId}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option value="">Select Owner</option>

                    {owners.map((owner) => (
                        <option
                            key={owner.id}
                            value={owner.id}
                        >
                            {owner.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
                >
                    Add Store
                </button>
            </form>
        </div>
    );
};

export default AddStoreForm;