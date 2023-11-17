const router = require("express").Router();
const {
  getData, updateData
} = require("../controller/project.and.development");
//

router.get("/", (req, res) => {
  getData(req, res);
});
 
router.patch("/", (req, res) => {
  updateData(req, res);
});

module.exports = router;
