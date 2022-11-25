var express = require("express");
var router = express.Router();
var Project = require("../model/project");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  const { email } = req.body;
  console.log(email);
  const project = await Project.findByEmail(email);
  res.send(project);
});

router.post("/id", async function (req, res, next) {
  const { id } = req.body;
  console.log(id);
  const project = await Project.findById(id);
  res.send(project);
});

module.exports = router;
