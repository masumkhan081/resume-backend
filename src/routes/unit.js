const express = require("express");
const router = express.Router();
const unitFunctions = require("../controllers/unit"); // controller functions

router.get("/", (req, res) => {
  unitFunctions.renderUnits(req, res);
});

router.post("/", (req, res) => {
  unitFunctions.createAndSave(req, res);
});

router.patch("/", (req, res) => {
  unitFunctions.handleUpdate(req, res);
});
router.delete("/:id", (req, res) => {
  unitFunctions.handleDelete(req, res);
});
//
module.exports = router;
