import express from "express";
import mongoose from "mongoose";
import { askAi } from "../services/openRouter.service.js";
import Roadmap from "../models/roadmap.model.js";
import RoadmapHistory from "../models/roadmapHistory.model.js";

const router = express.Router();

/* =========================================
   ✅ CREATE ROADMAP (AI)
========================================= */
router.post("/roadmap", async (req, res) => {
  try {
    const { role, userId } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!role) return res.status(400).json({ message: "Role is required" });

    const messages = [
      { role: "system", content: "You generate career roadmaps in JSON only." },
      {
        role: "user",
        content: `Create a career roadmap for becoming a ${role}.
Return JSON:
{
 "steps":[
   {"title":"Step name","description":"short explanation"}
 ]
}`
      }
    ];

    const aiResponse = await askAi(messages);
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    const savedRoadmap = await Roadmap.create({
      userId,
      role,
      steps: data.steps
    });

    res.json(savedRoadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI roadmap generation failed" });
  }
});

/* =========================================
   ✅ SAVE ROADMAP TO HISTORY
========================================= */
router.post("/roadmap/save", async (req, res) => {
  try {
    const { roadmapId, userId, title } = req.body;

    if (!roadmapId || !userId) {
      return res.status(400).json({ message: "roadmapId and userId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(roadmapId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid roadmapId or userId" });
    }

    const saved = await RoadmapHistory.create({
      userId,
      roadmapId,
      title: title || "Saved roadmap",
    });

    res.json({ message: "Roadmap saved successfully", saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save roadmap" });
  }
});

/* =========================================
   ✅ GET USER'S SAVED ROADMAP HISTORY
   Note: Call as /roadmap/history?userId=<USER_ID>
========================================= */
router.get("/roadmap/history", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid userId" });

    const history = await RoadmapHistory.find({ userId })
      .populate("roadmapId") // populate full roadmap
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch roadmap history" });
  }
});

/* =========================================
   ✅ GET SINGLE ROADMAP BY ID
   Call as /roadmap/:id
========================================= */
router.get("/roadmap/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid roadmap ID" });
    }

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    res.json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch roadmap" });
  }
});

export default router;