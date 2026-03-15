import mongoose from "mongoose";

const roadmapHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  title: { type: String }, // optional custom title for saved roadmap
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["completed", "in-progress"], default: "in-progress" },
});

export default mongoose.model("RoadmapHistory", roadmapHistorySchema);