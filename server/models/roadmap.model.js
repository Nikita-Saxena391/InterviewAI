import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  steps: [
    {
      title: String,
      description: String,
    }
  ]

},
{ timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;