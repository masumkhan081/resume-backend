const router = require("express").Router();
const {renderFormulations,handleDelete,handleUpdate,createAndSave} = require("../controllers/formulation");
//
router.get("/", (req, res) => {
  renderFormulations(req, res);
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
