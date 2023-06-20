const mongoose = require("mongoose");

// Schema for an Issue containg required fields
const issueSchema = new mongoose.Schema(
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
    labels: {
      type: String,
      required: true,
      default: "bug",
      enum: [
        "bug",
        "documentation",
        "enhancement",
        "good first issue",
        "help wanted",
        "question",
        "invalid",
        "wontfix",
      ],
    },
    status: {
      type: String,
      default: "open",
      enum: ["open", "in progress", "closed"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
