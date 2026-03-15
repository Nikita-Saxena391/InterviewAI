import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import RoadmapTree from "../components/RoadmapTree";

function CareerGuide() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useSelector((state) => state.user.userData); // Redux logged-in user

  const [roadmap, setRoadmap] = useState(null);
  const [saving, setSaving] = useState(false);

  // Direct backend URL
  const BACKEND_URL = "https://interviewai-app-70e1.onrender.com";

  // Fetch roadmap
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/career/roadmap/${id}`, {
          withCredentials: true,
        });
        setRoadmap(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch roadmap");
      }
    };
    fetchRoadmap();
  }, [id]);

  // Save roadmap to history
  const saveRoadmap = async () => {
    if (!roadmap) return;

    const userId = currentUser?._id;
    if (!userId) {
      alert("User not logged in");
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/career/roadmap/save`,
        {
          roadmapId: roadmap._id,
          userId,
          title: `${roadmap.role} - ${new Date().toLocaleDateString()}`,
        },
        { withCredentials: true }
      );

      alert("Roadmap saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save roadmap");
    } finally {
      setSaving(false);
    }
  };

  if (!roadmap) {
    return (
      <h2 style={{ textAlign: "center", color: "#fff", marginTop: "40px" }}>
        Loading roadmap...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px",
      }}
    >
      {/* Top Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/career")}
          style={{
            padding: "10px 20px",
            background: "#facc15",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            color: "#000",
          }}
        >
          ← Back
        </button>

        {/* Right Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={saveRoadmap}
            disabled={saving}
            style={{
              padding: "10px 20px",
              background: "#facc15", // yellow button
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              color: "#000",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => navigate("/roadmap/history")}
            style={{
              padding: "10px 20px",
              background: "#3b82f6", // blue button
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            History
          </button>
        </div>
      </div>

      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          color: "white",
          marginBottom: "40px",
        }}
      >
        {roadmap.role} Roadmap
      </h1>

      {/* Roadmap */}
      <RoadmapTree steps={roadmap.steps} />
    </div>
  );
}

export default CareerGuide;
