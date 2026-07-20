import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-10">
                Store Rating
            </h1>

            <nav className="flex flex-col gap-3">
                <Link
                    to="/admin"
                    className="p-3 rounded-lg hover:bg-slate-700"
                >
                    Dashboard
                </Link>

                <Link
                    to="#users"
                    className="p-3 rounded-lg hover:bg-slate-700"
                >
                    Users
                </Link>

                <Link
                    to="#stores"
                    className="p-3 rounded-lg hover:bg-slate-700"
                >
                    Stores
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;