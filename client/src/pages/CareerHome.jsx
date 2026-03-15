import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../utils/server";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsArrowLeft } from "react-icons/bs";

function CareerHome() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    try {
      if (!role) return alert("Enter a role");

      setLoading(true);

      const res = await axios.post(ServerUrl + "/api/career/roadmap", {
        role,
        userId: userData?._id,
      });

      navigate("/career/" + res.data._id);
    } catch (error) {
      console.log(error);
      alert("Roadmap generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#020617] via-[#0f172a] to-black text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        
        {/* Back Button */}
        <div className="self-start mb-6">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-500"
          >
            <BsArrowLeft size={20} /> Back
          </motion.button>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#070B1A] border border-purple-900/40 rounded-3xl p-10 shadow-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
            AI Career Roadmap
          </h1>

          <p className="text-gray-400 text-sm mb-6 text-center">
            Enter your desired role and generate a personalized AI-powered career roadmap.
          </p>

          <input
            type="text"
            placeholder="e.g., Frontend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#111827] text-white mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            onClick={generateRoadmap}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </motion.button>

          <p className="text-gray-500 text-xs mt-4 text-center">
            AI roadmap will guide you through skills, tools & projects needed for your role.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default CareerHome;