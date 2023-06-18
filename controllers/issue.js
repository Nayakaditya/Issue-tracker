// Import the necessary modules and models
const Issue = require("../models/issue");
const Project = require("../models/project");

// Controller for creating an issue
module.exports.createIssue = async (req, res) => {
  const projectId = req.params.projectId;
  const { name, description, author, labels } = req.body;

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      console.log("Project not found");
      res.redirect("/"); // Redirect to home page or appropriate error page
      return;
    }

    // Create a new issue in the database
    const issue = await Issue.create({
      name,
      description,
      author,
      labels,
      projectId,
    });

    // Push the issue to the project's issues array
    project.issues.push(issue._id);
    await project.save();

    console.log("New issue created:", issue);
    res.redirect(`/project/${projectId}`);
  } catch (err) {
    console.log("Error creating issue:", err);
    res.redirect(`/project/${projectId}`);
  }
};
