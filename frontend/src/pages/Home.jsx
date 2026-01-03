import React from 'react';
import Image from "../assets/home.png";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-6">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <p className="text-sm tracking-widest text-gray-400 mb-4">
                        SYSTEM SIMULATION PLATFORM
                    </p>

                    <h1 className="text-6xl font-semibold text-slate-900 leading-tight">
                        System <br /> Attack Simulator
                    </h1>

                    <p className="mt-6 text-gray-600 text-lg max-w-xl">
                        A controlled environment to stress, break, and recover
                        backend systems — built for engineers who care about
                        reliability, resilience, and real-world failure modes.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
                        >
                            Enter Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/signup")}
                            className="px-6 py-3 rounded-lg border text-black border-slate-300 hover:bg-white transition"
                        >
                            Request Access
                        </button>
                    </div>

                    <div className="mt-16 text-xs text-gray-400 tracking-wide">
                        Chaos engineering · Observability · System resilience
                    </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="relative">
                    {/* Card wrapper */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                        {/* Replace src with your image */}
                        <img
                            src={Image}
                            alt="Chaos Command Center Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Subtle background accent */}
                    <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-2xl bg-slate-200/60" />
                </div>

            </div>
        </div>
    )
}

export default Home