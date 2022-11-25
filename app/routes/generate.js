var express = require("express");
var router = express.Router();
const { exec } = require("child_process");
var Project = require("../model/project");
const { v4: uuidv4 } = require("uuid");

router.post("/", async function (req, res, next) {
  let { mapping } = req.body;
  const id = uuidv4();
  mapping = JSON.stringify(mapping);
  exec(`mkdir ${id}`);
  var child = exec(
    `python3 codegenerator.py '${mapping}' > ${id}/parser.py`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      const project = await Project.create([{ ...req.body, id }]);

      res.send(project);
    }
  );
});

module.exports = router;
