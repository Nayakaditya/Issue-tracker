// Import the necessary modules and models
const Project = require("../models/project");
const Issue = require("../models/issue");

// Controller for the home page route
module.exports.homePage = (req, res) => {
  Project.find()
    .then((projects) => {
      res.render("home", { title: "Issue Tracker - Home", projects });
    })
    .catch((err) => {
      console.log("Error fetching projects:", err);
      res.render("home", { projects: [] });
    });
};

// Controller for the project form page route
module.exports.createProjectForm = (req, res) => {
  res.render("createProject", { title: "Create a project here" });
};

// Controller for the single project details route
module.exports.projectDetails = (req, res) => {
  res.render("projectDetails", { title: " Project Details" });
};

module.exports.createIssueForm = (req, res) => {
  const projectId = req.params.projectId;
  res.render("createIssue", { title: "Create a issue Here", projectId });
};

// Controller for creating a project
module.exports.createProject = async (req, res) => {
  const { name, description, author } = req.body;
  try {
    const project = await Project.create({ name, description, author });
    console.log("New Project Created", project);
    res.redirect("/project/home");
  } catch (error) {
    console.log("Error in creating project", error);
    res.redirect("/project/home");
  }
};

// Controller for deleting a project
module.exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      console.log("Project not found");
      res.redirect("/"); // Redirect to home page or appropriate error page
      return;
    }

    console.log("Project deleted successfully");
    res.redirect("back"); // Redirect to home page or appropriate success page
  } catch (err) {
    console.log("Error deleting project:", err);
    res.redirect("back"); // Redirect to home page or appropriate error page
  }
};

// Controller for viewing project details and issues list
module.exports.getProjectDetails = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Find the project by ID and populate the issues
    const project = await Project.findById(projectId).populate("issues");

    if (!project) {
      console.log("Project not found");
      res.redirect("/"); // Redirect to home page or appropriate error page
      return;
    }

    return res.render("projectDetails", { title: "project detail", project });
  } catch (err) {
    console.log("Error retrieving project details:", err);
    res.redirect("/"); // Redirect to home page or appropriate error page
  }
};

module.exports.searchIssues = async (req, res) => {
  try {
    const { projectId } = req.params;
    const keyword = req.query.query;
    const regex = new RegExp(keyword, "i");

    const project = await Project.findById(projectId);

    if (!project) {
      res.json({
        error: "Project not found",
      });
      return;
    }

    const issues = await Issue.find({
      $and: [
        {
          $or: [
            { author: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        },
        { _id: { $in: project.issues } }, // Filter issues based on the project's issues
      ],
    });

    if (issues.length == 0) {
      res.send(
        "<h1 style='color: orange; font-family:sans-serif; text-align:center;'>No result found</h1>"
      );
    }

    return res.render("searchIssues", {
      title: "Issue found",
      project: project,
      issues,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/"); // Redirect to home page or appropriate error page
  }
};

// Get project details and apply filters
module.exports.filterIssues = async (req, res) => {
  const projectId = req.params.projectId;
  const filterLabels = req.query.labels; // Get the filter labels from the query parameters

  try {
    // Check if the project exists
    const project = await Project.findById(projectId).populate({
      path: "issues",
      match: {
        labels: { $in: filterLabels }, // Apply the filter on labels using $in operator
      },
    });

    if (!project) {
      console.log("Project not found");
      res.redirect("/"); // Redirect to home page or appropriate error page
      return;
    }

    console.log("Filtered issues:", project.issues);
    res.render("projectDetails", { project, title: "filtered issues" });
  } catch (err) {
    console.log("Error retrieving project details:", err);
    res.redirect("/");
  }
};
