const mongoose = require("mongoose");

// Schema for a project containg required fields
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
