import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const ServerUrl = "http://localhost:8000";

function RoadmapHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assuming you store user info in Redux
  const currentUser = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      if (!currentUser) return;

      try {
        const res = await axios.get(`${ServerUrl}/api/career/roadmap/history`, {
          params: { userId: currentUser._id },
        });

        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch roadmap history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-blue-950 py-10 px-4">
      <div className="w-full max-w-[90%] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
           onClick={() => navigate("/career")} 
            className="p-3 rounded-full bg-gray-900 border border-blue-900/40 shadow hover:shadow-blue-900/40 transition"
          >
            <FaArrowLeft className="text-blue-300" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-blue-300">Saved Roadmaps</h1>
            <p className="text-gray-400 mt-2">
              Track your saved career roadmaps
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-white text-center text-lg">Loading roadmaps...</p>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="bg-gray-900 border border-blue-900/40 p-10 rounded-2xl shadow-xl text-center">
            <p className="text-gray-400">No saved roadmaps found.</p>
          </div>
        )}

        {/* Roadmap List */}
        {!loading && history.length > 0 && (
          <div className="grid gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/roadmap/${item.roadmapId._id}`)}
                className="bg-yellow-400 border border-yellow-600 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {item.title || item.roadmapId.role}
                    </h3>
                    <p className="text-gray-800 text-sm mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapHistory;