const express = require("express");
const router = express.Router();

// Import the project controller
const projectController = require("../controllers/project");

// Home page route
router.get("/home", projectController.homePage);

// Issue form page route
router.get("/:projectId/issue/form", projectController.createIssueForm);

// Project form page route
router.get("/form", projectController.createProjectForm);

// Single project details route
router.get("/:projectId", projectController.getProjectDetails);

// Project creation route
router.post("/create", projectController.createProject);

//Delete Single Project
router.post("/:projectId/delete", projectController.deleteProject);

// Route for page issue form
router.get("/:projectId/issue_form", projectController.createIssueForm);

// Router for Search Issues
router.get("/:projectId/search", projectController.searchIssues);

router.get("/:projectId/filter", projectController.filterIssues);
module.exports = router;
