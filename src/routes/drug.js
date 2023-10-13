const mongoose = require("mongoose");
const checkExistence = require("../controllers/existence");
const { render_now, limit } = require("../data-tier/settings");
const obj = require("../data-tier/settings");

const router = require("express").Router();
const {} = require("../controllers/drugs");
//
router.get("/", (req, res) => {
  getStock(req, res);
});
router.post("/", (req, res) => {
  createAndSave(req, res);
});
router.patch("/", (req, res) => {
  handleUpdate(req, res);
});
router.delete("/:id", (req, res) => {
  handleDelete(req, res);
});

router.get("/search", (req, res) => {
  const name = req.query.frmname;
  renderFormulations(req, res, { name: name });
});
module.exports = router;
