const router = require("express").Router();
const {
 getData,updateData
} = require("../controller/contact.and.skill");
//

router.get("/", (req, res) => {
  getData(req, res);
});
 
router.patch("/", (req, res) => {
  updateData(req, res);
});

module.exports = router;
