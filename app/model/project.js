const mongoose = require("mongoose");
const validator = require("validator");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
  mapping: {
    type: mongoose.Schema.Types.Mixed,
  },
  code: {
    type: String,
  },
});

projectSchema.statics.findByEmail = async (email) => {
  const projects = await Project.find({
    email,
  });
  if (!projects) {
    throw new Error("No projects found");
  }
  return projects;
};

projectSchema.statics.findById = async (id) => {
  var project = await Project.findOne({ id });
  const { stdout } = await exec(`cat ${id}/parser.py`);
  project = { ...project, code: stdout };
  return project;
};

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
