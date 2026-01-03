import React, { useState } from 'react';
import { useSignupMutation } from '../redux/api/AuthApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [signup, { isLoading, isError }] = useSignupMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    const handleSignup = async () => {
        try {
            await signup(formData).unwrap();
            navigate("/login")
            alert("Signup successfull");
        } catch (error) {
            alert("Signup failed : ", error);
        }
    }

    return (
        <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                {/* CARD */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
                    <p className="text-xs tracking-widest text-gray-400 mb-3">
                        CREATE ACCOUNT
                    </p>

                    <h2 className="text-3xl font-semibold text-slate-900 mb-2">
                        Request access
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Create your System Attack Center account.
                    </p>

                    {/* INPUTS */}
                    <div className="space-y-5">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-slate-900 outline-none"
                            placeholder="Full name"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-slate-900 outline-none"
                            placeholder="Email address"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-slate-900 outline-none"
                            placeholder="Password"
                        />
                    </div>

                    {/* ACTION */}
                    <button
                        onClick={handleSignup}
                        className="mt-8 w-full py-3 rounded-lg
                       bg-slate-900 text-white
                       hover:bg-slate-800 transition"
                    >
                        {isLoading ? "Creating..." : "Create account"}
                    </button>

                    {/* FOOTER */}
                    <p className="mt-6 text-sm text-gray-500 text-center">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-slate-900 font-medium cursor-pointer hover:underline"
                        >
                            Sign in
                        </span>
                    </p>
                </div>

                {/* SMALL FOOTNOTE */}
                <p className="mt-6 text-xs text-gray-400 text-center">
                    © System Attack Center · Secure System Access
                </p>
            </div>
        </div>
    )
}

export default Signup