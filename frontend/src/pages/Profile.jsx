import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    // normally ye data /me API se aayega
    const user = {
        name: "Admin User",
        email: "admin@system.com",
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-sm p-8">

                <h1 className="text-xl font-semibold text-gray-900 mb-6">
                    User Profile
                </h1>

                {/* USER INFO */}
                <div className="space-y-4 mb-8">
                    <ProfileField label="Name" value={user.name} />
                    <ProfileField label="Email" value={user.email} />
                </div>

                {/* ACTION */}
                <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

/* ---------------- COMPONENT ---------------- */

function ProfileField({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
                {label}
            </p>
            <p className="text-lg text-gray-900 mt-1">
                {value}
            </p>
        </div>
    );
}
