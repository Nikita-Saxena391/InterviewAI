import React from "react";

function StepCard({ data }) {
  return (
    <div
      style={{
        background: "#facc15", // yellow
        borderRadius: "14px",
        padding: "18px",
        width: "150px",
        border: "1px solid #ddd",
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
        textAlign: "center",
        fontFamily: "sans-serif",
        margin: "8px",
        color: "black",
      }}
    >
      <div
        style={{
          background: "white",
          color: "black",
          fontSize: "12px",
          padding: "4px 8px",
          borderRadius: "20px",
          display: "inline-block",
          marginBottom: "8px",
        }}
      >
        Step {data.step}
      </div>

      <h3 style={{ margin: "0", fontSize: "14px" }}>{data.title}</h3>
    </div>
  );
}

export default StepCard;