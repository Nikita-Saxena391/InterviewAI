// src/server/controllers/insightsController.js
import { getCachedInsights, fetchAndCacheInsights } from "../services/insightsService.js";

export const getInsights = async (req, res) => {
  try {
    let insights = await getCachedInsights();
    if (!insights) {
      insights = await fetchAndCacheInsights();
    }
    res.json(insights || []);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
};