const express = require("express");
const router = express.Router();

// Import the issue controller
const issueController = require("../controllers/issue");

// Create an issue
router.post("/:projectId/issue/create", issueController.createIssue);
module.exports = router;
