var express = require("express");
var router = express.Router();
const { exec } = require("child_process");
var Project = require("../model/project");

router.post("/", async function (req, res, next) {
  let { id, input } = req.body;

  input = JSON.stringify(input);

  var child = exec(
    `python3 ${id}/parser.py '${input}'`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      res.send(stdout);
    }
  );
});

router.post("/code", async function (req, res, next) {
  let { id } = req.body;
  console.log(id);
  var child = exec(`cat ${id}/parser.py`, async (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
    res.send(stdout);
  });
});

module.exports = router;
