import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/api/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAttackMutation } from "../redux/api/AttackApi";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaBomb } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { GiChoppedSkull } from "react-icons/gi";

/* ---------------- DASHBOARD ---------------- */

export default function AttackDashboard() {
    const [attackRunning, setAttackRunning] = useState(false);
    const [lineData, setLineData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [attack] = useAttackMutation();
    const user = useSelector((state) => state.auth.user);

    const [metrics, setMetrics] = useState({
        total: 0,
        success: 0,
        failure: 0,
    })
    const [logs, setLogs] = useState([]);


    const runAttack = async (count) => {
        setAttackRunning(true);

        try {
            const res = await attack({
                target: "http://localhost:8081/hit",
                total: count,
                workers: 10,
            }).unwrap();

            setMetrics({
                total: res.total,
                success: res.success,
                failure: res.failure,
            })

            const timeStamp = new Date().toLocaleTimeString();

            setLineData((prev) => [
                ...prev.slice(-9),
                {
                    time: timeStamp,
                    success: res.success,
                    failure: res.failure,
                }
            ])

            setLogs((prev) => [
                `[${new Date().toLocaleTimeString()}] ATTACK x${count} started`,
                ...prev,
            ]);

            setLogs((prev) => [
                `[${new Date().toLocaleTimeString()}] Attack finished`,
                `[${new Date().toLocaleTimeString()}] Success: ${res.success}`,
                `[${new Date().toLocaleTimeString()}] Failure: ${res.failure}`,
                ...prev,
            ]);
        } catch (error) {
            alert("attack failed", error);
        } finally {
            setAttackRunning(false);
        }
    }

    const pieColors = ["#16a34a", "#dc2626"];

    const getPieData = () => [
        { name: "Success", value: metrics.success },
        { name: "Failure", value: metrics.failure },
    ];

    // const attackLevels = [
    //     { label: `${<AiFillThunderbolt />}Attack x100`, count: 100, type: "safe" },
    //     { label: `${<FaBomb />}Attack x1K`, count: 1000, type: "safe" },
    //     { label: `${<FaFire />}Attack x5K`, count: 5000, type: "stress" },
    //     { label: `${<FaFire />}ATTACK x15K`, count: 15000, type: "stress" },

    //     { label: "☠️ ATTACK x25K", count: 25000, type: "danger" },
    // ]

    console.log("user data : ", user);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">

            {/* ================= TOP STATUS BAR ================= */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">System Attack Simulator</h1>
                    <p className="text-xs text-gray-400">Auth • Control • Impact</p>
                </div>

                <div className="flex gap-6 text-sm item-center justify-center">
                    <Status label="User" value={user?.email || "Guest"} />
                    <Status label="Victim" value="ALIVE" green />
                    <Status
                        label="Attack"
                        value={attackRunning ? "RUNNING" : "IDLE"}
                        red={attackRunning}
                    />
                    <div
                        onClick={() => navigate("/profile")}
                        className="w-12 h-12 rounded-full flex justify-center items-center cursor-pointer bg-gray-200 hover:scale-105 duration-300 transition-transform">
                        <CiUser className="text-3xl" />
                    </div>
                </div>
            </div>

            {/* ================= CONTROL PANEL ================= */}
            <section className="px-8 py-6 bg-white border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-500 mb-4">
                    CONTROL PANEL
                </h2>

                <div className="flex flex-wrap gap-4">
                    <ControlButton
                        label={<AiFillThunderbolt />}
                        text="ATTACK x100"
                        onClick={() => runAttack(100)}
                    />
                    <ControlButton
                        label={<FaBomb />}
                        text="ATTACK x1000"
                        onClick={() => runAttack(1000)}
                    />
                    <ControlButton
                        label={<FaFire />}
                        text="ATTACK x5000"
                        onClick={() => runAttack(5000)}
                    />
                    <ControlButton
                        label={<FaFire />}
                        text="ATTACK x15000"
                        onClick={() => runAttack(15000)}
                    />
                    <ControlButton
                        label={<GiChoppedSkull />}
                        text="ATTACK x25000"
                        danger
                        onClick={() => runAttack(25000)}
                    />
                    <ControlButton
                        label={<GiChoppedSkull />}
                        text="ATTACK x100000"
                        danger
                        onClick={() => runAttack(100000)}
                    />
                    <ControlButton
                        label="🛑 STOP ATTACK"
                        danger
                        onClick={() => setAttackRunning(false)}
                    />
                </div>
            </section>

            {/* ================= IMPACT METRICS ================= */}
            <section className="px-8 py-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4">
                    IMPACT SUMMARY
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Metric title="TOTAL REQUESTS" value={metrics.total} />
                    <Metric title="SUCCESS" value={metrics.success} green />
                    <Metric title="FAILURES" value={metrics.failure} red />
                </div>
            </section>

            {/* ================= BEHAVIOR (CHART PLACEHOLDER) ================= */}
            <section className="px-8 py-8 bg-white border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-500 mb-6">
                    SYSTEM BEHAVIOR
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* -------- LINE CHART -------- */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <p className="text-xs tracking-widest text-gray-400 mb-4">
                            REQUESTS OVER TIME
                        </p>

                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={lineData}>
                                <XAxis dataKey="time" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="success"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="failure"
                                    stroke="#dc2626"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* -------- PIE CHART -------- */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <p className="text-xs tracking-widest text-gray-400 mb-4">
                            REQUEST DISTRIBUTION
                        </p>

                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={getPieData(metrics)}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    outerRadius={90}
                                >
                                    {getPieData(metrics).map((_, index) => (
                                        <Cell key={index} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="flex justify-around text-sm mt-4">
                            <span className="text-green-600">● Success</span>
                            <span className="text-red-600">● Failure</span>
                        </div>
                    </div>

                </div>
            </section>


            {/* ================= LIVE EVENTS ================= */}
            <section className="px-8 py-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4">
                    LIVE EVENTS
                </h2>

                <div className="bg-black text-green-400 font-mono text-xs rounded-lg p-4 h-40 overflow-y-auto">
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Status({ label, value, green, red }) {
    return (
        <div className="text-xs">
            <span className="text-gray-400">{label}: </span>
            <span
                className={`font-semibold ${green ? "text-green-600" : red ? "text-red-600" : ""
                    }`}
            >
                {value}
            </span>
        </div>
    );
}

function ControlButton({ label, onClick, danger, text }) {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 flex flex-row justify-center items-center gap-2 rounded-lg font-medium transition ${danger
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
        >
            {label}{text}
        </button>
    );
}

function Metric({ title, value, green, red }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-xs tracking-widest text-gray-400">{title}</p>
            <h2
                className={`text-4xl font-semibold mt-2 ${green ? "text-green-600" : red ? "text-red-600" : ""
                    }`}
            >
                {value}
            </h2>
        </div>
    );
}
