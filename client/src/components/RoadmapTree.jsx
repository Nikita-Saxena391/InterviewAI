import React from "react";
import StepCard from "./StepCard";

function RoadmapTree({ steps }) {
  const stepPerRow = 3;
  const arrowStyle = { fontSize: "20px", color: "#fff", margin: "0 8px" };
  const connectorStyle = { width: "4px", height: "30px", background: "#fff", margin: "0", borderRadius: "2px" };

  const blocks = [];
  let i = 0;
  while (i < steps.length) {
    const hBlock = steps.slice(i, i + stepPerRow);
    blocks.push({ type: "horizontal", steps: hBlock });
    i += stepPerRow;

    const vBlock = steps.slice(i, i + stepPerRow);
    if (vBlock.length > 0) {
      blocks.push({ type: "vertical", steps: vBlock });
      i += stepPerRow;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        minHeight: "100%",
        background: "black", // black → blue gradient
      }}
    >
      {blocks.map((block, bIndex) => {
        if (block.type === "horizontal") {
          return (
            <div key={bIndex} style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              {block.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <StepCard data={{ step: bIndex * stepPerRow + index + 1, title: step.title }} />
                  {index < block.steps.length - 1 && <span style={arrowStyle}>→</span>}
                </React.Fragment>
              ))}
            </div>
          );
        } else {
          return (
            <div key={bIndex} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
              {block.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <StepCard data={{ step: bIndex * stepPerRow + index + 1, title: step.title }} />
                  {index < block.steps.length - 1 && <div style={connectorStyle} />}
                </React.Fragment>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}

export default RoadmapTree;